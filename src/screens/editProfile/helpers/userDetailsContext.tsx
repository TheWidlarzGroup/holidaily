import React, { ReactNode, useContext, useState } from 'react'
import { TeamsType } from 'utils/mocks/teamsMocks'

type ContextValue = {
  userTeams: TeamsType[]
  setUserTeams: React.Dispatch<React.SetStateAction<TeamsType[]>>
}
type ContextProviderProps = {
  children: ReactNode
}

const initialValues = {
  userTeams: [],
  setUserTeams: () => {},
}

export const UserDetailsContext = React.createContext<ContextValue>(initialValues)
export const useUserDetailsContext = () => useContext(UserDetailsContext)

export const UserDetailsProvider = ({ children }: ContextProviderProps) => {
  const [userTeams, setUserTeams] = useState<TeamsType[]>([])
  console.log(userTeams)

  return (
    <UserDetailsContext.Provider value={{ userTeams, setUserTeams }}>
      {children}
    </UserDetailsContext.Provider>
  )
}
