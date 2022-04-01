import React, { ReactNode, useState, useCallback } from 'react'
import { Team } from 'mockApi/models/mirageTypes'
import { ContextProps, TeamsContext } from './TeamsContext'

type ProviderProps = {
  children: ReactNode
}

export const TeamsContextProvider = ({ children }: ProviderProps) => {
  const [teams, setTeams] = useState<Team[] | null>(null)

  const updateTeams = useCallback((newData: Team[]) => {
    setTeams((prev) => (prev ? [...prev, ...newData] : newData))
  }, [])

  const value: ContextProps = { teams, updateTeams }
  return <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
}
