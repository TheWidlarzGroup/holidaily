import React, { ReactNode, useState } from 'react'
import { RouteContext, RouteContextProps } from './RouteContext'

type ProviderProps = {
  children: ReactNode
}

export const RouteContextProvider = ({ children }: ProviderProps) => {
  const [currentRoute, setCurrentRoute] = useState<string>('')

  const value: RouteContextProps = { currentRoute, setCurrentRoute }
  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
}
