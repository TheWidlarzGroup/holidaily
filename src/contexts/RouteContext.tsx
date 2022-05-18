import React, { createContext } from 'react'

export type RouteContextProps = {
  currentRoute: string
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
}

export const RouteContext = createContext<RouteContextProps | null>(null)
