import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { Team, User } from 'mockApi/models/mirageTypes'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { ContextProps, TeamsContext } from './TeamsContext'

type ProviderProps = {
  children: ReactNode
}

export const TeamsContextProvider = ({ children }: ProviderProps) => {
  const { data } = useGetOrganization()
  const [teams, setTeams] = useState<Team[] | undefined>(data?.teams)
  const [allUsers, setAllUsers] = useState<User[] | undefined>([])

  const updateTeams = useCallback((newData: Team[]) => {
    setTeams((prev) => (prev ? [...prev, ...newData] : newData))
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

  const value: ContextProps = { teams, updateTeams, allUsers }
  return <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
}
