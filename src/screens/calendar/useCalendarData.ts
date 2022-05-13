import { useTeamsContext } from 'hooks/useTeamsContext'
import { useEffect, useState } from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { parseISO } from 'utils/dates'
import { Team } from 'mockApi/models'
import { useRequestsContext } from 'hooks/useRequestsContext'
import { FilterCategory } from './components/CategoriesSlider'
import { DayInfoProps } from '../../types/DayInfoProps'

export const useCalendarData = () => {
  const { teams } = useTeamsContext()
  const [filterCategories, setFilterCategories] = useState<FilterCategory[] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonthDays, setCurrentMonthDays] = useState<DayInfoProps[]>([])
  const { requests } = useRequestsContext()
  const { user } = useUserContext()

  useEffect(() => {
    if (!teams.length) return
    const unsubscribedTeams: FilterCategory[] = []
    const userTeams: FilterCategory[] = []
    teams.forEach((team) => {
      if (user?.teams.some((t) => t.name === team.name))
        return userTeams.push(parseCategory(team, true))
      unsubscribedTeams.push(parseCategory(team, false))
    })
    setFilterCategories([...userTeams, ...unsubscribedTeams])
  }, [teams, user?.teams])

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
    if (!requests.length) return
    const currentMonth = requests.find((month) => {
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
  }, [filterCategories, requests, selectedDate])

  return {
    filterCategories,
    toggleFilterItemSelection,
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  }
}

const parseCategory = (team: Team, isSelected: boolean) => ({
  id: +team.id,
  title: team.name,
  isSelected,
})
