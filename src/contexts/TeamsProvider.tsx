import React, { ReactNode, useEffect, useState } from 'react'
import { Team, User } from 'mockApi/models/mirageTypes'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { getUsersWithoutDuplicates } from 'utils/getUsersWithoutDuplicates'
import { TeamsContext, TeamsContextProps } from './TeamsContext'

type TeamsProviderProps = {
  children: ReactNode
}

export const TeamsContextProvider = ({ children }: TeamsProviderProps) => {
  const { data } = useGetOrganization()
  const [teams, setTeams] = useState<Team[]>(data?.teams || [])
  const [allUsers, setAllUsers] = useState<User[]>([])

  const addUserToTeams = (user: User, teamNames: string[], options?: { withReset?: true }) => {
    const initialTeams = data?.teams || []
    const teamsToUse = options?.withReset ? initialTeams : teams
    let { teamsToUpdate, unchangedTeams } = splitTeamsToUpdate(teamsToUse, teamNames)

    teamsToUpdate = teamsToUpdate.map((t) => ({ ...t, users: [...t.users, user] }))
    setTeams([...teamsToUpdate, ...unchangedTeams])
  }

  const reset = () => setTeams(data?.teams || [])

  useEffect(() => {
    const usersWithoutDuplicates = getUsersWithoutDuplicates(teams)
    setAllUsers(usersWithoutDuplicates)
  }, [teams])

  useEffect(() => {
    if (data) setTeams(data?.teams)
  }, [data])

  const value: TeamsContextProps = {
    teams,
    allUsers,
    addUserToTeams,
    reset,
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
