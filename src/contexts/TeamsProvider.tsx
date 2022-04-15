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

  const value: TeamsContextProps = { teams, updateTeams, allUsers }
  return <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
}
