import { useEffect, useState } from 'react'
import { getISODateString, parseISO } from 'utils/dates'
import { useRequestsContext } from 'hooks/context-hooks/useRequestsContext'
import { doesMonthInCalendarHasSixRows } from 'utils/doesMonthInCalendarHasSixRows'
import { getNextMonthRequests } from 'utils/getNextMonthRequests'
import { getFirstRequestsOfMonth } from 'utils/dayOffUtils'
import { HolidayRequestMonthType } from 'types/HolidayRequestMonthType'
import { eachDayOfInterval, lastDayOfMonth } from 'date-fns'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { DayInfoProps } from '../../types/DayInfoProps'
import { useTeamCategories } from './useTeamCategories'

export const useCalendarData = () => {
  const [selectedDate, setSelectedDateState] = useState<Date>(new Date())
  const [currentMonthDays, setCurrentMonthDays] = useState<DayInfoProps[]>([])
  const { updateSettings } = useUserSettingsContext()
  const { filterCategories } = useTeamCategories()
  const { requests } = useRequestsContext()

  const convertToLocalDate = (date: string) => {
    const dateToConvert = new Date(date)
    const localDate = new Date()
    dateToConvert.setHours(dateToConvert.getHours() - localDate.getTimezoneOffset() / 60)
    return dateToConvert
  }

  const setSelectedDate = (date: Date) => {
    const localDate = convertToLocalDate(getISODateString(date))
    updateSettings({ pickedDate: localDate })
    setSelectedDateState(localDate)
  }

  useEffect(() => {
    let currentMonthRequests = requests.find((month) => {
      const thisMonth = parseISO(month.date)
      return (
        thisMonth.getMonth() === selectedDate.getMonth() &&
        thisMonth.getFullYear() === selectedDate.getFullYear()
      )
    })

    if (!currentMonthRequests) {
      const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)

      const eachDayOfMonth = eachDayOfInterval({
        start: new Date(firstDayOfMonth),
        end: new Date(lastDayOfMonth(firstDayOfMonth)),
      })

      currentMonthRequests = {
        date: selectedDate.toISOString(),
        days: eachDayOfMonth.map((day) => ({ date: getISODateString(day) })),
      }
    }
    let bothMonthsRequests: HolidayRequestMonthType = {
      date: currentMonthRequests.date,
      days: currentMonthRequests.days,
    }

    if (doesMonthInCalendarHasSixRows(selectedDate)) {
      const nextMonthRequests = getNextMonthRequests(requests, selectedDate)
      const fewRequestsOfNextMonth = nextMonthRequests
        ? getFirstRequestsOfMonth(nextMonthRequests)
        : []

      const currentMonthRequestsDays = currentMonthRequests?.days

      bothMonthsRequests = {
        ...bothMonthsRequests,
        days: [...currentMonthRequestsDays, ...fewRequestsOfNextMonth],
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
    selectedDate,
    setSelectedDate,
    currentMonthDays,
  }
}
