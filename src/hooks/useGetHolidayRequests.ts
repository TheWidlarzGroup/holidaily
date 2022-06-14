import { useTeamsContext } from 'hooks/context-hooks/useTeamsContext'
import { useEffect, useState } from 'react'
import { getAllSingleHolidayRequests } from 'utils/dayOffUtils'
import { groupRequestsToMonths } from 'utils/groupRequestsToMonths'
import { HolidailyRequestMonthType } from '../types/HolidayRequestMonthType'
import { useUserContext } from './context-hooks/useUserContext'

export const useGetHolidayRequests = () => {
  const { teams, allUsers } = useTeamsContext()
  const [allMonths, setAllMonths] = useState<HolidailyRequestMonthType[]>([])
  const { user: appUser } = useUserContext()

  useEffect(() => {
    if (!appUser) return
    const { allSingleRequests } = getAllSingleHolidayRequests(allUsers, teams, appUser)
    const { groupedMonths } = groupRequestsToMonths(allSingleRequests)
    setAllMonths(groupedMonths)
  }, [allUsers, appUser, teams])

  return { allMonths }
}
