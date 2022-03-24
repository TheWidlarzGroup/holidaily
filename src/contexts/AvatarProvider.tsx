import React, { ReactNode, useState, createContext, useContext, useEffect } from 'react'
import { getItemAsync, setItemAsync } from 'expo-secure-store'

type ProviderProps = {
  children: ReactNode
}

export type ContextProps = {
  avatarUri: string | null | undefined
  updateAvatarUri: F1<string | null | undefined>
}

const PROFILE_PIC_STORE_KEY = 'profile-pic'
const AvatarContext = createContext<ContextProps | null>(null)

export const AvatarProvider = ({ children }: ProviderProps) => {
  const [avatarUri, setAvatarUri] = useState<string | null | undefined>(null)

  useEffect(() => {
    const loadImageIfPossible = async () => {
      const profilePic = await getItemAsync(PROFILE_PIC_STORE_KEY)
      if (profilePic && profilePic.length) setAvatarUri(profilePic)
    }
    loadImageIfPossible()
  }, [])

  const updateAvatarUri = async (uri: string | null | undefined) => {
    setAvatarUri(uri)
    await setItemAsync(PROFILE_PIC_STORE_KEY, uri ?? '')
  }
  const value: ContextProps = { avatarUri, updateAvatarUri }
  return <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
}

export const useAvatarContext = () => {
  const context = useContext(AvatarContext)

  if (context) {
    return context
  }

  throw Error('Use this hook in AvatarProvider scope')
}

AvatarProvider.displayName = 'AvatarProvider'
