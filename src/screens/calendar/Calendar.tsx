import React, { useRef } from 'react'

import { Calendar as RNCalendar } from 'react-native-calendars'
import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { Calendar as CalendarComponent } from 'components/Calendar'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useMonthPicker } from 'screens/calendar/useMonthPicker'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { DateTime } from 'luxon'
import { CategoriesSlider } from './components/CategoriesSlider'
import { MonthPickerModal } from './components/MonthPickerModal'

export const Calendar = () => {
  const calendarRef = useRef<RNCalendar>()
  const {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  } = useCalendarData()
  const { isMonthPickerVisible, displayMonthPicker, hideMonthPicker, handleMonthChange } =
    useMonthPicker(calendarRef, setSelectedDate)

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
          markedDates={getMarkedDates(currentMonthDays)}
          markingType={'multi-dot'}
          onHeaderPressed={() => displayMonthPicker()}
          ref={calendarRef}
        />
      </Box>
      <EventsList days={currentMonthDays} />
      <MonthPickerModal
        isMonthPickerVisible={isMonthPickerVisible}
        hideMonthPicker={hideMonthPicker}
        handleMonthChange={handleMonthChange}
        selectedDate={selectedDate}
      />
    </SafeAreaWrapper>
  )
}
