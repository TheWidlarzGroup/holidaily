import { useEffect, useState } from 'react'
import { MOCKED_DATA } from 'screens/calendar/MockedData'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import XDate from 'xdate'
import { FilterCategory } from './components/CategoriesSlider'

export const useCalendarData = () => {
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
    MOCKED_DATA.filterCategories
  )
  const [selectedDate, setSelectedDate] = useState<XDate>(new XDate())
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
      const thisMonth = new XDate(month.date)
      return (
        thisMonth.getMonth() === selectedDate.getMonth() &&
        thisMonth.getFullYear() === selectedDate.getFullYear()
      )
    })
    if (currentMonth) setCurrentMonthDays(currentMonth.days)
    else setCurrentMonthDays([])
  }, [selectedDate, filterCategories])

  return {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  }
}
