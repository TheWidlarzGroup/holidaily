import { useEffect, useState } from 'react'
import { MOCKED_DATA } from 'screens/calendar/MockedData'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { DateTime } from 'luxon'

type FilterCategory = {
  id: number
  title: string
  isSelected: boolean
}
export type SelectedDate = {
  year: number
  month: number
}
export const useCalendarData = () => {
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
    MOCKED_DATA.filterCategories
  )
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  })
  const [currentMonthDays, setCurrentMonthDays] = useState<DayInfoProps[]>([])

  const toggleFilterItemSelection = (id: number) => {
    setFilterCategories((prevState) => {
      const newState = [...prevState]
      const index = newState.findIndex((item) => item.id === id)
      newState[index].isSelected = !prevState[index].isSelected
      return newState
    })
  }
  useEffect(() => {
    const currentMonth = MOCKED_DATA.months.find((month) => {
      const thisMonth = DateTime.fromISO(month.date)
      const selectedMonth = DateTime.local(selectedDate.year, selectedDate.month)
      return thisMonth.equals(selectedMonth)
    })
    if (currentMonth) setCurrentMonthDays(currentMonth.days)
    else setCurrentMonthDays([])
  }, [selectedDate])

  return {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  }
}
