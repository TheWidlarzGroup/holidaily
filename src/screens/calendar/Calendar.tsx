import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList, useWindowDimensions } from 'react-native'
import { ExpandableCalendar } from 'components/ExpandableCalendar'
import { getISODateString, parseISO } from 'utils/dates'
import { RequestsContextProvider } from 'contexts/RequestsProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import { RouteProp, useRoute } from '@react-navigation/native'
import { BottomTabRoutes } from 'navigation/types'
import { PrevScreen, usePrevScreenBackHandler } from 'hooks/usePrevScreenBackHandler'
import { CategoriesSlider } from './components/CategoriesSlider'

const CalendarToWrap = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const route = useRoute<RouteProp<BottomTabRoutes, 'CALENDAR'>>()
  const [switchCalendarHeight, setSwitchCalendarHeight] = useState(true)
  const prevScreen: PrevScreen = route.params?.prevScreen
  const { width } = useWindowDimensions()

  const {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  } = useCalendarData()

  usePrevScreenBackHandler(prevScreen)

  useEffect(() => {
    if (currentIndex === 0) {
      const currentDate = getISODateString(new Date())
      const dayEvents = currentMonthDays.find((a) => a.date === currentDate)
      if (!dayEvents) return
      const index = currentMonthDays.indexOf(dayEvents)
      setCurrentIndex(index)
    }

    // Comment: we don't want to track currentIndex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonthDays])

  const handleDayPress = useCallback(
    ({ dateString }: { dateString: string }) => {
      setTimeout(() => setSelectedDate(parseISO(dateString)))
    },
    [setSelectedDate]
  )

  useEffect(() => {
    const dateString = getISODateString(selectedDate)
    const dayEvents = currentMonthDays.find((a) => a.date === dateString)
    if (!dayEvents) return

    const index = currentMonthDays.indexOf(dayEvents)
    setCurrentIndex(index)

    flatListRef.current?.scrollToIndex({ index, animated: true })
  }, [currentMonthDays, selectedDate])

  // Comment: show loader spinner while calendar is rendering
  const [isLoading, { setFalse: hideLoader }] = useBooleanState(true)

  useEffect(() => {
    hideLoader()
  }, [hideLoader])

  const markedDates = useMemo(() => getMarkedDates(currentMonthDays), [currentMonthDays])

  const calendarMarginVertical = 24
  const calendarWidth = width - calendarMarginVertical

  if (isLoading) return <LoadingModal show />

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <CategoriesSlider
        filterCategories={filterCategories || []}
        toggleFilterItemSelection={toggleFilterItemSelection}
      />
      <Box
        width={calendarWidth}
        position="absolute"
        marginTop="xxxl"
        marginHorizontal="xm"
        borderRadius="lmin"
        backgroundColor="white"
        zIndex="10"
        shadowOffset={{ width: 0, height: 2 }}
        shadowColor="black"
        shadowOpacity={0.15}
        shadowRadius={6}
        elevation={4}>
        <ExpandableCalendar
          markedDates={markedDates}
          markingType="multi-dot"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onDayPress={handleDayPress}
          isFullHeight={switchCalendarHeight}
          setIsFullHeight={setSwitchCalendarHeight}
        />
      </Box>
      <EventsList
        ref={flatListRef}
        days={currentMonthDays}
        currentIndex={currentIndex}
        componentWidth={calendarWidth}
        switchCalendarHeight={switchCalendarHeight}
        setSwitchCalendarHeight={setSwitchCalendarHeight}
        btnOnPress={() =>
          flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true })
        }
      />
    </SafeAreaWrapper>
  )
}

export const Calendar = () => (
  <RequestsContextProvider>
    <CalendarToWrap />
  </RequestsContextProvider>
)
