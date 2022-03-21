import { createContext } from 'react'

export type ContextProps = {
  avatarUri: string
  updateUri: (newUri: string) => void
}

export const UserContext = createContext<ContextProps | null>(null)
