import React, { ReactNode, useState, createContext, useContext } from 'react'

type ProviderProps = {
  children: ReactNode
}

export type ContextProps = {
  avatarUri: string | null | undefined
  updateAvatarUri: F1<string | null | undefined>
}

const AvatarContext = createContext<ContextProps | null>(null)

export const AvatarProvider = ({ children }: ProviderProps) => {
  const [avatarUri, setAvatarUri] = useState<string | null | undefined>(null)
  const updateAvatarUri = (uri: string | null | undefined) => setAvatarUri(uri)
  const value: ContextProps = { avatarUri, updateAvatarUri }
  return <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
}

export const useAvatarContext = () => {
  const context = useContext(AvatarContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in AvatarContextProvider scope')
}

AvatarProvider.displayName = 'AvatarContextProvider'
