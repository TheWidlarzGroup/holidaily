import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { Team, User } from 'mockApi/models/mirageTypes'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { TeamsContextProps, TeamsContext } from './TeamsContext'

type TeamsProviderProps = {
  children: ReactNode
}

export const TeamsContextProvider = ({ children }: TeamsProviderProps) => {
  const { data } = useGetOrganization()
  const [teams, setTeams] = useState<Team[]>(data?.teams || [])
  const [allUsers, setAllUsers] = useState<User[]>([])

  const updateTeams = useCallback((newData: Team[]) => {
    setTeams((prev) => [...prev, ...newData])
  }, [])

  const addUserToTeams = (user: User, teamNames: string[], options?: { withReset?: true }) => {
    const initialTeams = data?.teams || []
    const teamsToUse = options?.withReset ? initialTeams : teams
    let { teamsToUpdate, unchangedTeams } = splitTeamsToUpdate(teamsToUse, teamNames)

    teamsToUpdate = teamsToUpdate.map((t) => ({ ...t, users: [...t.users, user] }))
    setTeams(teamsToUpdate.concat(unchangedTeams))
  }

  const reset = useCallback(() => setTeams(data?.teams || []), [data?.teams])

  useEffect(() => {
    const removeDuplicatesOfAllUsers = () => {
      let users: User[] = []
      teams?.forEach((team) => users.push(...team.users))
      users = users.filter((user, i, arr) => arr.findIndex((usr) => usr.id === user.id) === i)
      setAllUsers(users)
    }
    removeDuplicatesOfAllUsers()
  }, [teams])

  useEffect(() => {
    if (data) {
      setTeams(data?.teams)
    }
  }, [data])

  const value: TeamsContextProps = {
    teams,
    updateTeams,
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
