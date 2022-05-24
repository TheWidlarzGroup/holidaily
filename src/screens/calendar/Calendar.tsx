import React, { useCallback, useEffect, useRef } from 'react'

import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { ExpandableCalendar } from 'components/ExpandableCalendar'
import { parseISO } from 'utils/dates'
import { RequestsContextProvider } from 'contexts/RequestsProvider'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import { useFocusEffect } from '@react-navigation/native'
import { CategoriesSlider } from './components/CategoriesSlider'
import { Analytics } from '../../services/analytics'

const CalendarToWrap = () => {
  const flatListRef = useRef<FlatList>(null)
  const {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  } = useCalendarData()

  useFocusEffect(useCallback(() => () => Analytics().track('CALENDAR_VIEWED'), []))

  const handleDayPress = ({ dateString }: { dateString: string }) => {
    const dayEvents = currentMonthDays.find((a) => a.date === dateString)
    if (!dayEvents) return
    const index = currentMonthDays.indexOf(dayEvents)
    flatListRef.current?.scrollToIndex({ index, animated: true })
    setTimeout(() => setSelectedDate(parseISO(dateString)))
  }

  // Comment: show loader spinner while calendar is rendering
  const [isLoading, { setFalse: hideLoader }] = useBooleanState(true)
  useEffect(() => {
    hideLoader()
  }, [hideLoader])
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
          markedDates={getMarkedDates(currentMonthDays)}
          markingType="multi-dot"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onDayPress={handleDayPress}
        />
      </Box>
      <EventsList days={currentMonthDays} ref={flatListRef} />
    </SafeAreaWrapper>
  )
}

export const Calendar = () => (
  <RequestsContextProvider>
    <CalendarToWrap />
  </RequestsContextProvider>
)
