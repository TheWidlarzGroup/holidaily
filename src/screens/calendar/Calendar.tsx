import React, { useRef } from 'react'

import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { FlatList } from 'react-native'
import { ExpandableCalendar } from 'components/ExpandableCalendar'
import { parseISO } from 'utils/dates'
import { CategoriesSlider } from './components/CategoriesSlider'

export const Calendar = () => {
  const flatListRef = useRef<FlatList>(null)
  const {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  } = useCalendarData()

  const handleDayPress = ({ dateString, day }: { dateString: string; day: number }) => {
    if (currentMonthDays.length > 0 && currentMonthDays.length > day - 1) {
      flatListRef.current?.scrollToIndex({ index: day - 1, animated: true })
    }
    setTimeout(() => setSelectedDate(parseISO(dateString)))
  }

  return (
    <SafeAreaWrapper isDefaultBgColor isTabNavigation>
      <CategoriesSlider
        filterCategories={filterCategories}
        toggleFilterItemSelection={toggleFilterItemSelection}
      />
      <Box
        borderRadius="lmin"
        backgroundColor="white"
        marginTop="m"
        paddingBottom="m"
        shadowOffset={{ width: 0, height: 2 }}
        shadowColor="black"
        shadowOpacity={0.15}
        shadowRadius={6}
        elevation={4}>
        <ExpandableCalendar
          markedDates={getMarkedDates(currentMonthDays)}
          markingType={'multi-dot'}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onDayPress={handleDayPress}
        />
      </Box>
      <EventsList days={currentMonthDays} ref={flatListRef} />
    </SafeAreaWrapper>
  )
}
