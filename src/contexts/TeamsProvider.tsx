import React, { ReactNode, useState, useCallback, useEffect } from 'react'
import { Team } from 'mockApi/models/mirageTypes'
import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { ContextProps, TeamsContext } from './TeamsContext'

type ProviderProps = {
  children: ReactNode
}

export const TeamsContextProvider = ({ children }: ProviderProps) => {
  const { data } = useGetOrganization()
  const [teams, setTeams] = useState<Team[] | undefined>(data?.teams)

  const updateTeams = useCallback((newData: Team[]) => {
    setTeams((prev) => (prev ? [...prev, ...newData] : newData))
  }, [])

  useEffect(() => {
    if (data) {
      setTeams(data?.teams)
    }
  }, [data])

  const value: ContextProps = { teams, updateTeams }
  return <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
}
