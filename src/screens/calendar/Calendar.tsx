import React, { useRef } from 'react'

import { FlatList } from 'react-native'
import { Calendar as RNCalendar } from 'react-native-calendars'
import MonthPicker from 'react-native-month-year-picker'
import { Box } from 'utils/theme'
import { EventsList } from 'screens/calendar/components/EventsList'
import { Calendar as CalendarComponent } from 'components/Calendar'
import { SliderItem } from 'screens/calendar/components/SliderItem'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { CustomModal } from 'components/CustomModal'
import { useMonthPicker } from 'screens/calendar/useMonthPicker'
import { getMarkedDates } from 'screens/calendar/utils'
import { useCalendarData, SelectedDate } from 'screens/calendar/useCalendarData'

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
      <Box>
        <FlatList
          horizontal
          data={filterCategories}
          renderItem={({ item }) => (
            <SliderItem {...item} toggleItemSelection={() => toggleFilterItemSelection(item.id)} />
          )}
          ListHeaderComponent={() => <Box width={8} />}
          ListFooterComponent={() => <Box width={8} />}
          keyExtractor={({ id }) => id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
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
          onMonthChange={(date: SelectedDate) =>
            setSelectedDate({ year: date.year, month: date.month })
          }
          markedDates={getMarkedDates(currentMonthDays)}
          markingType={'multi-dot'}
          onHeaderPressed={() => displayMonthPicker()}
          ref={calendarRef}
        />
      </Box>
      <Box marginTop="m" flex={1}>
        <EventsList days={currentMonthDays} />
      </Box>
      <CustomModal
        style={{
          position: 'absolute',
          bottom: -20,
          left: -20,
          right: -20,
        }}
        isVisible={isMonthPickerVisible}
        onBackdropPress={() => hideMonthPicker()}>
        <MonthPicker
          onChange={handleMonthChange}
          value={new Date(selectedDate.year, selectedDate.month - 1)}
        />
      </CustomModal>
    </SafeAreaWrapper>
  )
}
