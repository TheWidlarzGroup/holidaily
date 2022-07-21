import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
import { PanGestureHandler } from 'react-native-gesture-handler'
import { DayInfoProps } from 'types/DayInfoProps'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { useCalendarContext } from 'hooks/context-hooks/useCalendarContext'
import { useBooleanState } from 'hooks/useBooleanState'
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'
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

const isEndDateLowerThanStartDate = (startDate: string, endDate: string) => {
  const startTimestamp = new Date(startDate).getTime()
  const endTimestamp = new Date(endDate).getTime()

  return endTimestamp < startTimestamp
}

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

  const scrollToIndex = (index: number) =>
    flatListRef.current?.scrollToIndex({ index, animated: true })

  useEffect(() => {
    const pickedDate = userSettings?.pickedDate
    if (pickedDate !== selectedDate && pickedDate) setSelectedDate(pickedDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { notify } = useGetNotificationsConfig()

  const styles = useStyles()

  const { t } = useTranslation('calendar')

  const [slicedRequests, setSlicedRequest] = useState<DayInfoProps[]>([])

  const [singlePreviousEvent, setSinglePreviousEvent] = useState<DayOffEvent | null>(null)

  const isPeriodStartLowerThanRequestsDate = useMemo(() => {
    const periodStartTimestamp = new Date(periodStart)?.getTime()
    const firstRequestDayTimestamp = new Date(requestsDays?.[0]?.date)?.getTime()

    return periodStartTimestamp < firstRequestDayTimestamp
  }, [periodStart, requestsDays])

  const handleSetPreviousEvent = useCallback(() => {
    const getPreviousEvent = () => {
      if (isPeriodStartLowerThanRequestsDate) {
        return null
      }

      const todayIndex = requestsDays.findIndex((a) => a.date === periodStart || a.date === today)

      const reversedRequests = requestsDays.slice(0, todayIndex).reverse()
      const reversedRequestsWithEvents = reversedRequests.filter((a) => !!a?.events?.length)

      const event = reversedRequestsWithEvents[0]?.events?.[0]

      return event || null
    }

    const prevEvent = getPreviousEvent()

    if (singlePreviousEvent?.date !== prevEvent?.date) {
      setSinglePreviousEvent(prevEvent)
    }
  }, [isPeriodStartLowerThanRequestsDate, periodStart, requestsDays, singlePreviousEvent?.date])

  useEffect(() => {
    handleSetPreviousEvent()
    // we want to set this only on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetEventsInPeriod = (passedStartIndex?: number) => {
    const startDateItemIndex = passedStartIndex || 0

    if (!periodStart && !passedStartIndex) handleSetPeriodStart(today)

    const endDateItemIndex = requestsDays.findIndex((a) => a.date === periodEnd)

    const sliceEndIndex = endDateItemIndex === -1 ? requestsDays?.length : endDateItemIndex + 1

    const sliced = requestsDays.slice(startDateItemIndex, sliceEndIndex)

    setSlicedRequest(sliced)
  }

  const clearDatesInputs = () => {
    handleSetPeriodStart('')
    handleSetPeriodEnd('')
    setSlicedRequest([])
    handleSetPreviousEvent()
  }

  useEffect(() => {
    if (slicedRequests.length > 0) {
      scrollToIndex(0)
    }
  }, [slicedRequests.length])

  const disableSetDateButton = periodStart?.length < 9 && periodEnd?.length < 9

  const springConfig = {
    damping: 6,
    stiffness: 288,
    mass: 1,
  }

  const handleSwipeDown = () => {
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
    handleSetPreviousEvent()
  }

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {},
    onEnd: (event) => {
      if (event.velocityY > 0) {
        offset.value = withSpring(150, springConfig, (finished) => {
          if (finished) {
            offset.value = withSpring(0, springConfig)
          }
        })

        runOnJS(handleSwipeDown)()
      }
    },
  })

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
      } else if (endDay.length < 2) {
        endDate = `${endYear}-${endMonth}-0${endDay}`
      } else {
        endDate = `${endYear}-${endMonth}-${endDay}`
      }
      handleSetPeriodEnd(endDate)
    }

    return { startDate, endDate }
  }

  const [wasDateChangePressed, { setTrue: setWasDateChangePressed }] = useBooleanState(false)

  const handleSetDatePress = () => {
    let startIndex = 0

    const { startDate, endDate } = adjustStartEndDates()

    if (isEndDateLowerThanStartDate(startDate, endDate)) {
      /// do sth
    }

    if (!startDate) {
      startIndex = requestsDays.findIndex((a) => a.date === today)
    } else if (isPeriodStartLowerThanRequestsDate && !endDate) {
      startIndex = 0
    } else {
      startIndex = requestsDays.findIndex((a) => a.date === startDate)
    }

    if (startIndex === -1) {
      setSlicedRequest([])
      notify('infoCustom', {
        params: { title: t('emptyStateNotificationTitle') },
        config: { duration: 5000 },
      })
    } else {
      handleSetEventsInPeriod(startIndex)
    }

    setWasDateChangePressed()
    handleSetPreviousEvent()
  }

  const { navigate } = useNavigation<CalendarNavigatorType<'CALENDAR'>>()

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }))

  const showEmptyState = wasDateChangePressed && slicedRequests.length === 0

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
      {!showEmptyState ? (
        <Box marginTop="xxxxl" alignItems="center">
          <Text variant="textMD">{t('emptyScreenTitle')}</Text>
          <Text marginTop="xs" variant="textXSGrey">
            {t('emptyScreenSubtitle')}
          </Text>
        </Box>
      ) : (
        <Box
          backgroundColor="lightGrey"
          flex={1}
          borderRadius="l"
          marginTop={singlePreviousEvent ? 'xxxl' : 'l'}
          paddingTop="xxxl">
          <AnimatedBox flex={1} style={animatedStyles}>
            <Box paddingBottom="xm" justifyContent="center" alignItems="center">
              <PanGestureHandler onGestureEvent={panGestureHandler}>
                <AnimatedBox style={styles.swipeDownRecognizer}>
                  <Text variant="textXSGrey">{t('swipeDownToSeePrevious')}</Text>
                  <SwipeDown style={styles.swipeDownIcon} />
                </AnimatedBox>
              </PanGestureHandler>
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
      )}
      <Box paddingHorizontal="s" position="absolute" top={190} width="100%">
        <Box borderRadius="lmin" backgroundColor="calendarOlderEvents" paddingHorizontal="mlplus">
          {inputWasFocused || periodEnd || periodStart ? (
            <Box
              flexDirection="row"
              marginHorizontal="m"
              position="absolute"
              right={0}
              top={5}
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
            <Box opacity={showEmptyState ? 0 : 0.5} height={showEmptyState ? 0 : 'auto'}>
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
