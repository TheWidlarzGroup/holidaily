import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Box, mkUseStyles, Text } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabRoutes, CalendarNavigatorType } from 'navigation/types'
import { PrevScreen, usePrevScreenBackHandler } from 'hooks/usePrevScreenBackHandler'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { useTranslation } from 'react-i18next'
import CloseIcon from 'assets/icons/icon-close.svg'
import AcceptIcon from 'assets/icons/icon-accept.svg'
import SwipeDown from 'assets/icons/icon-swipe-down.svg'
import {
  Directions,
  FlingGestureHandler,
  FlingGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'
import { DayInfoProps } from 'types/DayInfoProps'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useCalendarContext } from 'hooks/context-hooks/useCalendarContext'
import { useBooleanState } from 'hooks/useBooleanState'
import { getDateWithMonthString, getDayName } from 'utils/dates'
import { DateInputs } from './components/DateInputs'
import { CalendarButton } from './components/CalendarButton'
import { DayEvent, DayOffEvent } from './components/DayEvent'
import { CategoriesSlider } from './components/CategoriesSlider'

const getSlicedDate = (date: string) => {
  const splittedDate = date.split('-')
  const year = splittedDate[0]
  const month = splittedDate[1]
  const day = splittedDate[2]

  return { year, month, day }
}

const date = new Date()
const today = date.toISOString().split('T')[0]

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const Calendar = () => {
  const flatListRef = useRef<FlatList>(null)
  const route = useRoute<RouteProp<BottomTabRoutes, 'CALENDAR'>>()
  const [switchCalendarHeight, setSwitchCalendarHeight] = useState(true)
  const prevScreen: PrevScreen = route.params?.prevScreen
  const { userSettings } = useUserSettingsContext()

  const offset = useSharedValue(0)

  const [inputWasFocused, { setTrue: setInputWasFocused }] = useBooleanState(false)

  const { selectedDate, setSelectedDate, currentMonthDays, requestsDays } = useCalendarData()

  const { periodStart, periodEnd, handleSetPeriodStart, handleSetPeriodEnd } = useCalendarContext()

  usePrevScreenBackHandler(prevScreen)

  const scrollToIndex = useCallback(
    (index: number) => flatListRef.current?.scrollToIndex({ index, animated: true }),
    []
  )

  useEffect(() => {
    const pickedDate = userSettings?.pickedDate
    if (pickedDate !== selectedDate && pickedDate) setSelectedDate(pickedDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const styles = useStyles()

  const { t } = useTranslation('calendar')

  const [slicedRequests, setSlicedRequest] = useState<DayInfoProps[]>([])

  const [singlePreviousEvent, setSinglePreviousEvent] = useState<DayOffEvent | null>(null)

  useEffect(() => {
    const getPreviousEvent = () => {
      const todayIndex = requestsDays.findIndex((a) => a.date === today)

      const reversedRequests = requestsDays.slice(0, todayIndex).reverse()
      const reversedRequestsWithEvents = reversedRequests.filter((a) => !!a?.events?.length)

      const event = reversedRequestsWithEvents[0]?.events?.[0]

      return event || null
    }

    setSinglePreviousEvent(getPreviousEvent())
  }, [requestsDays])

  const handleSetEventsInPeriod = (passedStartIndex?: number) => {
    const startDateItemIndex = passedStartIndex || 0

    if (!periodStart && !passedStartIndex) handleSetPeriodStart(today)

    const endDateItemIndex = requestsDays.findIndex((a) => a.date === periodEnd)

    const sliceEndIndex = endDateItemIndex === -1 ? requestsDays?.length : endDateItemIndex + 1

    const sliced = requestsDays.slice(startDateItemIndex, sliceEndIndex)

    setSlicedRequest(sliced)
    // scrollToIndex(0)
  }

  const clearDatesInputs = () => {
    handleSetPeriodStart('')
    handleSetPeriodEnd('')
    setSlicedRequest([])
  }

  const disableSetDateButton = periodStart?.length < 9 && periodEnd?.length < 9

  const springConfig = {
    overshootClamping: true,
    mass: 0.9,
    stifness: 100,
  }

  const swipeDownAnimation = () => {
    offset.value = withSequence(
      withSpring(200, springConfig),
      withSpring(-50, springConfig),
      withSpring(0, springConfig)
    )
  }

  console.log('offset', offset)
  const handleSwipeDown = (e: FlingGestureHandlerGestureEvent) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      swipeDownAnimation()
      const dateToRevert = periodStart || today
      const { month: monthString, year: yearString } = getSlicedDate(dateToRevert)

      const year = Number(yearString)
      const month = Number(monthString)

      let newPeriodStart = ''

      if (month === 1) {
        newPeriodStart = `${year - 1}-12-01`
        handleSetPeriodStart(newPeriodStart)
      } else {
        if (month > 10) {
          newPeriodStart = `${year}-${month - 1}-01`
        } else {
          newPeriodStart = `${year}-0${month - 1}-01`
        }
        handleSetPeriodStart(newPeriodStart)
      }

      const startDateItemIndex = requestsDays.findIndex((a) => a.date === newPeriodStart)

      handleSetEventsInPeriod(startDateItemIndex)
    }
  }

  const adjustStartEndDates = () => {
    const { year: startYear, month: startMonth, day: startDay } = getSlicedDate(periodStart)
    const { year: endYear, month: endMonth, day: endDay } = getSlicedDate(periodEnd)

    let startDate = ''
    let endDate = ''

    if (periodStart && startDay) {
      if (startDay === '0') {
        startDate = `${startYear}-${startMonth}-01`
      } else if (startDay.length < 2) {
        startDate = `${startYear}-${startMonth}-0${startDay}`
      } else {
        startDate = `${startYear}-${startMonth}-${startDay}`
      }
      handleSetPeriodStart(startDate)
    }

    if (periodEnd && endDay) {
      if (endDay === '0') {
        endDate = `${endYear}-${endMonth}-01`
      } else if (Number(endDay) < 10) {
        endDate = `${endYear}-${endMonth}-0${endDay}`
      } else {
        endDate = `${endYear}-${endMonth}-${endDay}`
      }
      handleSetPeriodEnd(endDate)
    }

    return { startDate, endDate }
  }

  const handleSetDatePress = () => {
    let startIndex = 0

    const { startDate } = adjustStartEndDates()

    if (!startDate) {
      startIndex = requestsDays.findIndex((a) => a.date === today)
    } else {
      startIndex = requestsDays.findIndex((a) => a.date === startDate)
    }

    handleSetEventsInPeriod(startIndex)
  }

  const { navigate } = useNavigation<CalendarNavigatorType<'CALENDAR'>>()

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }))

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom', 'top']} isDefaultBgColor>
      <CategoriesSlider />
      <Box position="relative" paddingHorizontal="m">
        <DateInputs
          onIconPress={() => navigate('CALENDAR_MODAL')}
          periodStart={periodStart}
          periodEnd={periodEnd}
          handleSetPeriodStart={handleSetPeriodStart}
          handleSetPeriodEnd={handleSetPeriodEnd}
          setInputWasFocused={setInputWasFocused}
        />
      </Box>

      <Box backgroundColor="lightGrey" flex={1} borderRadius="l" marginTop="xxxl" paddingTop="xxxl">
        <AnimatedBox flex={1} style={animatedStyles}>
          <Box paddingTop="l" paddingBottom="xm" justifyContent="center" alignItems="center">
            <FlingGestureHandler direction={Directions.DOWN} onHandlerStateChange={handleSwipeDown}>
              <AnimatedBox style={styles.swipeDownRecognizer}>
                <Text variant="textXSGrey">{t('swipeDownToSeePrevious')}</Text>
                <SwipeDown style={styles.swipeDownIcon} />
              </AnimatedBox>
            </FlingGestureHandler>
          </Box>
          <EventsList
            ref={flatListRef}
            selectedDate={selectedDate}
            days={!slicedRequests?.length ? currentMonthDays : slicedRequests}
            switchCalendarHeight={switchCalendarHeight}
            setSwitchCalendarHeight={setSwitchCalendarHeight}
            btnOnPress={() => flatListRef.current?.scrollToIndex({ index: 0, animated: true })}
          />
        </AnimatedBox>
      </Box>
      <Box paddingHorizontal="s" position="absolute" top={200} width="100%">
        <Box borderRadius="lmin" backgroundColor="calendarOlderEvents" paddingHorizontal="mlplus">
          {inputWasFocused ? (
            <Box
              flexDirection="row"
              marginHorizontal="m"
              position="absolute"
              right={0}
              top={10}
              zIndex="2">
              <CalendarButton onIconPress={clearDatesInputs}>
                <CloseIcon color={styles.closeIcon.color} />
              </CalendarButton>
              <CalendarButton
                onIconPress={handleSetDatePress}
                type="blue"
                disabled={disableSetDateButton}>
                <AcceptIcon
                  color={
                    !disableSetDateButton
                      ? styles.acceptIcon.color
                      : styles.acceptIconDisabled.color
                  }
                />
              </CalendarButton>
            </Box>
          ) : null}
          <Box marginTop="m">
            <Text marginBottom="m" textTransform="uppercase" variant="textBoldXSGrey">
              {slicedRequests.length > 0 ? t('selectedTimeframe') : t('dayOffCalendar')}
            </Text>
          </Box>
          {singlePreviousEvent ? (
            <Box opacity={0.5}>
              <Text variant="captionText" marginBottom="xxs">
                {getDateWithMonthString(singlePreviousEvent.date)},{' '}
                <Text color="darkGrey">{getDayName(singlePreviousEvent.date)}</Text>
              </Text>
              <DayEvent event={singlePreviousEvent} />
            </Box>
          ) : null}
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme) => ({
  calendar: {
    width: 400,
    marginTop: theme.spacing.s,
  },
  swipeDownRecognizer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeDownIcon: {
    marginLeft: theme.spacing.xxm,
    color: theme.colors.titleActive,
  },
  closeIcon: {
    color: theme.colors.headerGrey,
  },
  acceptIcon: {
    color: theme.colors.alwaysWhite,
  },
  acceptIconDisabled: {
    color: theme.colors.disabledAcceptIcon,
  },
}))
