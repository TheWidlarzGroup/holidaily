import React, { ReactNode, useEffect, useState } from 'react'
import { Team, User } from 'mockApi/models/mirageTypes'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { getUsersWithoutDuplicates } from 'utils/getUsersWithoutDuplicates'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { sortUsersByHolidayDate } from 'utils/sortByDate'
import { TeamsContext, TeamsContextProps } from './TeamsContext'

type TeamsProviderProps = {
  children: ReactNode
}

export const TeamsContextProvider = ({ children }: TeamsProviderProps) => {
  const { data } = useGetOrganization()
  const { user } = useUserContext()
  const [teams, setTeams] = useState<Team[]>(data?.teams || [])
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [usersWithoutPastReq, setUsersWithoutPastReq] = useState<User[]>([])

  const addUserToTeams = (user: User, teamNames: string[], options?: { withReset?: true }) => {
    const initialTeams = data?.teams || []
    const teamsToUse = options?.withReset ? initialTeams : teams
    let { teamsToUpdate, unchangedTeams } = splitTeamsToUpdate(teamsToUse, teamNames)

    teamsToUpdate = teamsToUpdate.map((t) => ({ ...t, users: [...t.users, user] }))
    setTeams([...teamsToUpdate, ...unchangedTeams])
  }

  const reset = () => setTeams(data?.teams || [])

  useEffect(() => {
    if (data) setTeams(data?.teams)
  }, [data])

  useEffect(() => {
    if (teams.length < 1) return
    const usersWithoutDuplicates = getUsersWithoutDuplicates(teams)
    setAllUsers(usersWithoutDuplicates)
  }, [teams])

  useEffect(() => {
    if (allUsers.length < 1) return
    // Comment: Demo user from TeamsContext didn't have teams assigned, so whole user is added from UserContext
    let allFilteredUsers: User[] = allUsers.filter((teamsUser) => teamsUser.id !== user?.id)
    if (user) allFilteredUsers.push(user)

    allFilteredUsers = allFilteredUsers.map((user) => ({
      ...user,
      requests: user.requests.filter((req) => req.status !== 'past'),
    }))
    allFilteredUsers = allFilteredUsers.filter((user) => user.requests.length > 0)

    setUsersWithoutPastReq(sortUsersByHolidayDate(allFilteredUsers))
  }, [allUsers, user])

  const value: TeamsContextProps = {
    teams,
    allUsers,
    addUserToTeams,
    reset,
    usersWithoutPastReq,
  }
  return <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
}

const splitTeamsToUpdate = (teams: Team[], teamsToUpdateNames: string[]) => {
  const teamsToUpdate: Team[] = []
  const unchangedTeams: Team[] = []
  teams.forEach((t) =>
    teamsToUpdateNames.includes(t.name) ? teamsToUpdate.push(t) : unchangedTeams.push(t)
  )
  return { teamsToUpdate, unchangedTeams }
}
