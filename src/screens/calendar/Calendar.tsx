import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Box, mkUseStyles, Text, theme } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { getFormattedPeriod, getDurationInDays, calculatePTO } from 'utils/dates'
import { RequestsContextProvider } from 'contexts/RequestsProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import { SwipeableModalRegular } from 'components/SwipeableModalRegular'
import { CalendarList } from 'components/CalendarList'
import { CustomButton } from 'components/CustomButton'
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
import Animated from 'react-native-reanimated'
import { DateInputs } from './components/DateInputs'
import { CategoriesSlider } from './components/CategoriesSlider'
import { CalendarButton } from './components/CalendarButton'
import { DayEvent, DayOffEvent } from './components/DayEvent'

const getSlicedDate = (date: string) => {
  const splittedDate = date.split('-')
  const year = splittedDate[0]
  const month = splittedDate[1]
  const day = splittedDate[2] || month?.slice(-1)

  return { year, month, day }
}

const getActionModalHeaderText = (
  periodStart: string,
  periodEnd: string,
  t: any,
  language: string
) => {
  if (periodStart?.length < 10 || periodEnd?.length < 10) return ''

  const withOneBeforeText = language === 'en' ? '' : 1

  if (periodStart === periodEnd)
    return `${withOneBeforeText} ${getDurationInDays(1)} ${t('outOfOfficeSingular')}`

  return `${getDurationInDays(calculatePTO(periodStart, periodEnd))} ${t('outOfOffice')}`
}

const getActionModalTitle = (periodStart: string, periodEnd: string) => {
  if (periodStart.length < 10 || periodEnd.length < 10) return ''

  return getFormattedPeriod(periodStart, periodEnd)
}

const date = new Date()
const today = date.toISOString().split('T')[0]

const AnimatedBox = Animated.createAnimatedComponent(Box)

const CalendarToWrap = () => {
  const flatListRef = useRef<FlatList>(null)
  const { filterCategories, toggleFilterItemSelection, currentMonthDays, requestsDays } =
    useCalendarData()

  const styles = useStyles()

  const { i18n, t } = useTranslation('calendar')

  const [periodStart, setPeriodStart] = useState('')
  const [periodEnd, setPeriodEnd] = useState('')

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

  const [isCalendarOpened, { setFalse: hideCalendar, setTrue: openCalendar }] =
    useBooleanState(false)

  const handleSetEventsInPeriod = (passedStartIndex?: number) => {
    const startDateItemIndex = passedStartIndex || 0

    if (!periodStart && !passedStartIndex) setPeriodStart(today)

    const endDateItemIndex = requestsDays.findIndex((a) => a.date === periodEnd)

    const sliceEndIndex = endDateItemIndex === -1 ? requestsDays?.length : endDateItemIndex + 1

    const sliced = requestsDays.slice(startDateItemIndex, sliceEndIndex)

    setSlicedRequest(sliced)
  }

  // Comment: show loader spinner while calendar is rendering
  const [isLoading, { setFalse: hideLoader }] = useBooleanState(true)

  useEffect(() => {
    hideLoader()
  }, [hideLoader])

  const markedDates = useMemo(() => getMarkedDates(requestsDays), [requestsDays])

  const onModalBtnPress = () => {
    hideCalendar()
  }

  const clearDatesInputs = () => {
    setPeriodStart('')
    setPeriodEnd('')
    setSlicedRequest([])
  }

  const shouldShowCalendarButtons =
    periodStart?.length >= 8 || periodEnd?.length >= 8 || slicedRequests?.length > 0

  const handleSwipeDown = (e: FlingGestureHandlerGestureEvent) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      const dateToRevert = periodStart || today
      const { month: monthString, year: yearString } = getSlicedDate(dateToRevert)

      const year = Number(yearString)
      const month = Number(monthString)

      let newPeriodStart = ''

      if (month === 1) {
        newPeriodStart = `${year - 1}-12-01`
        setPeriodStart(newPeriodStart)
      } else {
        if (month > 10) {
          newPeriodStart = `${year}-${month - 1}-01`
        } else {
          newPeriodStart = `${year}-0${month - 1}-01`
        }
        setPeriodStart(newPeriodStart)
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
        console.log('her', startDay)
        startDate = `${startYear}-${startMonth}-0${startDay}`
      }
      setPeriodStart(startDate)
    }

    if (periodEnd && endDay) {
      if (endDay === '0') {
        endDate = `${endYear}-${endMonth}-01`
      } else if (Number(endDay) < 10) {
        endDate = `${endYear}-${endMonth}-0${endDay}`
      }
      setPeriodEnd(endDate)
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
  if (isLoading) return <LoadingModal show />

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']} isDefaultBgColor>
      <Box>
        <CategoriesSlider
          filterCategories={filterCategories || []}
          toggleFilterItemSelection={toggleFilterItemSelection}
        />

        <Box position="relative" paddingHorizontal="m">
          <DateInputs
            onIconPress={openCalendar}
            periodStart={periodStart}
            periodEnd={periodEnd}
            setPeriodStart={setPeriodStart}
            setPeriodEnd={setPeriodEnd}
          />
          {shouldShowCalendarButtons ? (
            <Box
              flexDirection="row"
              marginHorizontal="m"
              position="absolute"
              right={0}
              top={70}
              zIndex="2">
              <CalendarButton onIconPress={clearDatesInputs}>
                <CloseIcon color={theme.colors.headerGrey} />
              </CalendarButton>
              <CalendarButton onIconPress={handleSetDatePress} type="blue">
                <AcceptIcon color={theme.colors.white} />
              </CalendarButton>
            </Box>
          ) : null}
          <Box marginTop="l1plus">
            <Text marginBottom="m" textTransform="uppercase" variant="textBoldXSGrey">
              Kalendarz Urlopów
            </Text>
          </Box>
        </Box>
      </Box>
      <SwipeableModalRegular
        isOpen={isCalendarOpened}
        onHide={hideCalendar}
        hasIndicator
        closeIcon="back">
        <Box position="relative">
          <CalendarList
            periodStart={periodStart}
            periodEnd={periodEnd || periodStart}
            selectPeriodStart={setPeriodStart}
            selectPeriodEnd={setPeriodEnd}
            selectable
            disablePastDates
            style={styles.calendar}
            markedDates={markedDates}
            markingType="multi-dot"
          />
          <Box
            shadowOffset={{ width: -2, height: 0 }}
            shadowColor="black"
            shadowOpacity={0.04}
            shadowRadius={2}
            elevation={20}
            alignItems="center"
            paddingVertical="l"
            backgroundColor="alwaysWhite"
            zIndex="2"
            position="absolute"
            bottom={100}
            width="100%">
            <Text variant="displayBoldSM">{getActionModalTitle(periodStart, periodEnd)}</Text>
            <Text variant="textSM">
              {getActionModalHeaderText(periodStart, periodEnd, t, i18n.language)}
            </Text>
            <Box marginTop="m">
              <CustomButton
                label={t('select')}
                variant="primary"
                onPress={onModalBtnPress}
                disabled={!periodStart}
              />
            </Box>
          </Box>
        </Box>
      </SwipeableModalRegular>
      <Box backgroundColor="lightGrey" flex={1} paddingTop="xxxl" borderRadius="l">
        <Box paddingTop="ml" paddingBottom="ml" justifyContent="center" alignItems="center">
          <FlingGestureHandler direction={Directions.DOWN} onHandlerStateChange={handleSwipeDown}>
            <AnimatedBox style={styles.swipeDownRecognizer}>
              <Text variant="textXSGrey">Przesun palcem w dol aby zobaczyc poprzednie </Text>
              <SwipeDown color={theme.colors.titleActive} style={styles.swipeDownIcon} />
            </AnimatedBox>
          </FlingGestureHandler>
        </Box>
        <EventsList
          days={!slicedRequests?.length ? currentMonthDays : slicedRequests}
          ref={flatListRef}
        />
      </Box>
      <Box paddingHorizontal="s" position="absolute" top={205} width="100%">
        <Box
          opacity={0.5}
          borderRadius="lmin"
          backgroundColor="white"
          paddingVertical="s"
          paddingHorizontal="mlplus">
          {singlePreviousEvent ? <DayEvent event={singlePreviousEvent} /> : null}
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}

export const Calendar = () => (
  <RequestsContextProvider>
    <CalendarToWrap />
  </RequestsContextProvider>
)

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
  },
}))
