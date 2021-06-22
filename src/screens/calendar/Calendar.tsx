import React, { useEffect, useRef, useState } from 'react'

import { FlatList } from 'react-native'
import { DateTime } from 'luxon'
import XDate from 'xdate'
import { Calendar as RNCalendar } from 'react-native-calendars'
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED } from 'react-native-month-year-picker'
import { Box } from 'utils/theme'
import { DayInfoProps, DayOffEvent } from 'screens/calendar/components/DayInfo'
import { EventsList } from 'screens/calendar/components/EventsList'
import { Calendar as CalendarComponent } from 'components/Calendar'
import { SliderItem } from 'screens/calendar/components/SliderItem'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { CustomModal } from 'components/CustomModal'
import { MOCKED_DATA } from './MockedData'

type FilterCategory = {
  id: number
  title: string
  isSelected: boolean
}
export type SelectedDate = {
  year: number
  month: number
}
export const Calendar = () => {
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
    MOCKED_DATA.filterCategories
  )
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  })
  const [currentMonthDays, setCurrentMonthDays] = useState<DayInfoProps[]>([])
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState<boolean>(false)
  const calendarRef = useRef<RNCalendar>()

  useEffect(() => {
    const currentMonth = MOCKED_DATA.months.find((month) => {
      const thisMonth = DateTime.fromISO(month.date)
      const selectedMonth = DateTime.local(selectedDate.year, selectedDate.month)
      return thisMonth.equals(selectedMonth)
    })
    if (currentMonth) setCurrentMonthDays(currentMonth.days)
    else setCurrentMonthDays([])
  }, [selectedDate])

  const toggleFilterItemSelection = (id: number) => {
    setFilterCategories((prevState) => {
      const newState = [...prevState]
      const index = newState.findIndex((item) => item.id === id)
      newState[index].isSelected = !prevState[index].isSelected
      return newState
    })
  }
  const handleMonthChange = (event: ACTION_DATE_SET | ACTION_DISMISSED, newDate: Date) => {
    switch (event) {
      case ACTION_DATE_SET:
        setIsMonthPickerVisible(false)
        setSelectedDate({ year: newDate.getFullYear(), month: newDate.getMonth() + 1 })
        calendarRef.current.updateMonth(new XDate(newDate), true)
        break
      case ACTION_DISMISSED:
        setIsMonthPickerVisible(false)
        break
      default:
        setIsMonthPickerVisible(false)
    }
  }
  const getMarkedDates = () =>
    currentMonthDays
      .filter((day) => day.events?.length)
      .reduce(
        (_, { date, events = [] }) => ({
          [date]: {
            dots: events.map((event: DayOffEvent) => ({
              key: event.person,
              color: event.color,
            })),
          },
        }),
        {}
      )

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
          markedDates={getMarkedDates()}
          markingType={'multi-dot'}
          onHeaderPressed={() => setIsMonthPickerVisible(true)}
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
        onBackdropPress={() => setIsMonthPickerVisible(false)}>
        <MonthPicker
          onChange={handleMonthChange}
          value={new Date(selectedDate.year, selectedDate.month - 1)}
        />
      </CustomModal>
    </SafeAreaWrapper>
  )
}
