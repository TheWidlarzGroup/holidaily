import { useTeamsContext } from 'hooks/useTeamsContext'
import { useEffect, useState } from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { parseISO } from 'utils/dates'
import { Team } from 'mockApi/models'
import { useRequestsContext } from 'hooks/useRequestsContext'
import { doesMonthInCalendarHasSixRows } from 'utils/doesMonthInCalendarHasSixRows'
import { add } from 'date-fns'
import { HolidailyRequestMonthType } from 'types/HolidayRequestMonthType'
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
    const currentMonthRequests = requests.find((month) => {
      const thisMonth = parseISO(month.date)
      return (
        thisMonth.getMonth() === selectedDate.getMonth() &&
        thisMonth.getFullYear() === selectedDate.getFullYear()
      )
    })

    if (!currentMonthRequests) return

    let bothMonthsRequests: HolidailyRequestMonthType = {
      date: currentMonthRequests.date,
      days: currentMonthRequests.days,
    }

    if (doesMonthInCalendarHasSixRows(selectedDate)) {
      const nextMonthRequests = requests.find((month) => {
        const thisMonth = parseISO(month.date)
        const nextMonth = add(selectedDate, { months: 1 })
        return (
          thisMonth.getMonth() === nextMonth.getMonth() &&
          thisMonth.getFullYear() === nextMonth.getFullYear()
        )
      })
      if (!nextMonthRequests) return

      const currentMonthRequestsDays = currentMonthRequests?.days
      // Comment: get only four first days from next month, as week calendar may not display them in next month, so it will be displayed in previous month
      const nextMonthRequestsDays = nextMonthRequests?.days.filter((day) => {
        if (new Date(day.date).getDay() === 6 || new Date(day.date).getDay() === 0) return
        return (
          day.date.slice(-2) === '01' ||
          day.date.slice(-2) === '02' ||
          day.date.slice(-2) === '03' ||
          day.date.slice(-2) === '04'
        )
      })

      bothMonthsRequests = {
        ...bothMonthsRequests,
        days: [...currentMonthRequestsDays, ...nextMonthRequestsDays],
      }
    }

    if (bothMonthsRequests) {
      const newCurrentMonthDays = bothMonthsRequests.days.map((day) => {
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
