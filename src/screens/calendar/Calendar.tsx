import React, { useRef, useState } from 'react'

import { Calendar as RNCalendar } from 'react-native-calendars'
import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { Calendar as CalendarComponent } from 'components/Calendar'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useMonthPicker } from 'screens/calendar/useMonthPicker'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { DateTime } from 'luxon'
import { FlatList } from 'react-native'
import deepmerge from 'deepmerge'
import { CategoriesSlider } from './components/CategoriesSlider'
import { MonthPickerModal } from './components/MonthPickerModal'

export const Calendar = () => {
  const calendarRef = useRef<RNCalendar>(null)
  const flatListRef = useRef<FlatList>(null)
  const {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  } = useCalendarData()
  const { isMonthPickerVisible, displayMonthPicker, hideMonthPicker, handleMonthChange } =
    useMonthPicker(calendarRef, setSelectedDate)
  const [selectedDay, setSelectedDay] = useState('2021-06-01')

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
        <CalendarComponent
          theme={{
            calendarBackground: 'transparent',
          }}
          onMonthChange={(date: { dateString: string }) =>
            setSelectedDate(DateTime.fromISO(date.dateString))
          }
          markedDates={deepmerge(getMarkedDates(currentMonthDays), {
            [selectedDay]: { selected: true },
          })}
          markingType={'multi-dot'}
          onHeaderPressed={() => displayMonthPicker()}
          onDayPress={({ dateString, day }: { dateString: string; day: number }) => {
            setSelectedDay(dateString)
            if (currentMonthDays.length > 0)
              flatListRef.current?.scrollToIndex({ index: day - 1, animated: true })
          }}
          ref={calendarRef}
        />
      </Box>
      <EventsList days={currentMonthDays} ref={flatListRef} />
      <MonthPickerModal
        isMonthPickerVisible={isMonthPickerVisible}
        hideMonthPicker={hideMonthPicker}
        handleMonthChange={handleMonthChange}
        selectedDate={selectedDate}
      />
    </SafeAreaWrapper>
  )
}
