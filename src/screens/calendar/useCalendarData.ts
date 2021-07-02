import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { MOCKED_DATA } from 'screens/calendar/MockedData'
import { FilterCategory } from './components/CategoriesSlider'
import { DayInfoProps } from './components/DayInfo'

export const useCalendarData = () => {
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
    MOCKED_DATA.filterCategories
  )
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now())
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
      return thisMonth.month === selectedDate.month && thisMonth.year === selectedDate.year
    })
    if (currentMonth) {
      const newCurrentMonthDays = currentMonth.days.map((day) => {
        if (day.weekend || !day.events) return day
        return {
          ...day,
          events: day.events.filter(
            (event) =>
              filterCategories?.find((category) => category.id === event.categoryId)?.isSelected
          ),
        }
      })
      setCurrentMonthDays(newCurrentMonthDays)
    } else setCurrentMonthDays([])
  }, [selectedDate.month, selectedDate.year, filterCategories])

  return {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  }
}
