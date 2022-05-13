import { useTeamsContext } from 'hooks/useTeamsContext'
import { useEffect, useState } from 'react'
import { getAllSingleHolidayRequests } from 'utils/getAllSingleHolidayRequests'
import { groupRequestsToMonths } from 'utils/groupRequestsToMonths'
import { HolidailyRrequestMonthType } from '../types/HolidayRequestMonthType'
import { useUserContext } from './useUserContext'

export const useGetHolidayRequests = () => {
  const { teams, allUsers } = useTeamsContext()
  const [allMonths, setAllMonths] = useState<HolidailyRrequestMonthType[]>([])
  const { user: appUser } = useUserContext()

  useEffect(() => {
    if (!appUser) return
    const { allSingleRequests } = getAllSingleHolidayRequests(allUsers, teams, appUser)
    const { groupedMonths } = groupRequestsToMonths(allSingleRequests)
    setAllMonths(groupedMonths)
  }, [allUsers, appUser, teams])

  return { allMonths }
}
