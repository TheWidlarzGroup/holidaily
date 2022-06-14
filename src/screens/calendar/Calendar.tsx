import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { ExpandableCalendar } from 'components/ExpandableCalendar'
import { getISODateString, parseISO } from 'utils/dates'
import { RequestsContextProvider } from 'contexts/RequestsProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import { CategoriesSlider } from './components/CategoriesSlider'

const CalendarToWrap = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const [switchCalendarHeight, setSwitchCalendarHeight] = useState(true)

  const {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  } = useCalendarData()

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
      const dayEvents = currentMonthDays.find((a) => a.date === dateString)
      if (!dayEvents) return
      const index = currentMonthDays.indexOf(dayEvents)
      setCurrentIndex(index)
      flatListRef.current?.scrollToIndex({ index, animated: true })
      setTimeout(() => setSelectedDate(parseISO(dateString)))
    },
    [currentMonthDays, setSelectedDate]
  )

  // Comment: show loader spinner while calendar is rendering
  const [isLoading, { setFalse: hideLoader }] = useBooleanState(true)

  useEffect(() => {
    hideLoader()
  }, [hideLoader])

  const markedDates = useMemo(() => getMarkedDates(currentMonthDays), [currentMonthDays])

  if (isLoading) return <LoadingModal show />

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <CategoriesSlider
        filterCategories={filterCategories || []}
        toggleFilterItemSelection={toggleFilterItemSelection}
      />
      <Box
        borderRadius="lmin"
        backgroundColor="white"
        marginTop="m"
        marginHorizontal="xm"
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
