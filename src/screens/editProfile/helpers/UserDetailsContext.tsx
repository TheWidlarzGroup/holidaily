import React, { ReactNode, useContext, useState } from 'react'
import { TeamsType } from 'utils/mocks/teamsMocks'

type ContextValue = {
  userTeams: TeamsType[]
  setUserTeams: React.Dispatch<React.SetStateAction<TeamsType[]>>
  userColor: string
  setUserColor: React.Dispatch<React.SetStateAction<string>>
}
type ContextProviderProps = {
  children: ReactNode
}

const initialValues = {
  setUserTeams: () => {},
  userTeams: [],
  setUserColor: () => {},
  userColor: '',
}

export const UserDetailsContext = React.createContext<ContextValue>(initialValues)
export const useUserDetailsContext = () => useContext(UserDetailsContext)

export const UserDetailsProvider = ({ children }: ContextProviderProps) => {
  const [userTeams, setUserTeams] = useState<TeamsType[]>([])
  const [userColor, setUserColor] = useState('')

  return (
    <UserDetailsContext.Provider value={{ userTeams, setUserTeams, userColor, setUserColor }}>
      {children}
    </UserDetailsContext.Provider>
  )
}
