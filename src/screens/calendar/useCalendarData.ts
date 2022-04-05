import { useTeamsContext } from 'hooks/usePostsContext'
import { useEffect, useState } from 'react'
import { parseISO } from 'utils/dates'
import { useGetRangeDates } from 'hooks/useGetRangeDates'
import { FilterCategory } from './components/CategoriesSlider'
import { DayInfoProps } from './components/DayInfo'

export const useCalendarData = () => {
  const { teams } = useTeamsContext()
  const [filterCategories, setFilterCategories] = useState<FilterCategory[] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonthDays, setCurrentMonthDays] = useState<DayInfoProps[]>([])
  const { allMonths } = useGetRangeDates('2022-02-01', '2022-06-15')

  console.log(allMonths)

  useEffect(() => {
    if (teams?.length === 0 || !teams) return
    const teamsData = teams.map((team, i) => {
      if (i === 0 || i === 1) {
        return { id: +team.id, title: team.name, isSelected: true }
      }
      return { id: +team.id, title: team.name, isSelected: false }
    })
    setFilterCategories(teamsData)
  }, [teams])

  const toggleFilterItemSelection = (id: number) => {
    setFilterCategories((prevState) => {
      if (!prevState) return []
      const newState = [...prevState]
      const index = newState.findIndex((item) => item.id === id)
      newState[index].isSelected = !prevState[index].isSelected
      return newState
    })
  }
  useEffect(() => {
    const currentMonth = allMonths.find((month) => {
      const thisMonth = parseISO(month.date)
      return (
        thisMonth.getMonth() === selectedDate.getMonth() &&
        thisMonth.getFullYear() === selectedDate.getFullYear()
      )
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
  }, [filterCategories, selectedDate])

  return {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  }
}
