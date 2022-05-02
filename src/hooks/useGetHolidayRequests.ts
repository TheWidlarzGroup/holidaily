import { useTeamsContext } from 'hooks/useTeamsContext'
import { useEffect, useState } from 'react'
import { DayInfoProps } from 'screens/calendar/components/DayInfo'
import { getAllSingleHolidayRequests } from 'utils/getAllSingleHolidayRequests'
import { groupRequestsToMonths } from 'utils/groupRequestsToMonths'
import { useUserContext } from './useUserContext'

export type MonthType = {
  date: string
  days: DayInfoProps[]
}

export const useGetHolidayRequests = () => {
  const { teams, allUsers } = useTeamsContext()
  const [allMonths, setAllMonths] = useState<MonthType[]>([])
  const { user: appUser } = useUserContext()

  useEffect(() => {
    if (!appUser) return
    const { allSingleRequests } = getAllSingleHolidayRequests(allUsers, teams, appUser)
    const { groupedMonths } = groupRequestsToMonths(allSingleRequests)
    setAllMonths(groupedMonths)
  }, [allUsers, appUser, teams])

  return { allMonths }
}
