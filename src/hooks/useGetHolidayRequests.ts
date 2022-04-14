/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { useTeamsContext } from 'hooks/useTeamsContext'
import { useEffect, useState } from 'react'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { getAllSingleHolidayRequests } from 'utils/getAllSingleHolidayRequests'
import { groupRequestsToMonths } from 'utils/groupRequestsToMonths'

export type MonthType = {
  date: string
  days: DayInfoProps[]
}

export const useGetHolidayRequests = () => {
  const { teams, allUsers } = useTeamsContext()
  const [allMonths, setAllMonths] = useState<MonthType[]>([])

  useEffect(() => {
    const { allSingleRequests } = getAllSingleHolidayRequests(allUsers, teams)
    const { groupedMonths } = groupRequestsToMonths(allSingleRequests)
    setAllMonths(groupedMonths)
  }, [allUsers, teams])

  return { allMonths }
}
