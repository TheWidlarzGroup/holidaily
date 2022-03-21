import React, { ReactNode, useState, createContext, useContext, useEffect } from 'react'
import { getItemAsync, setItemAsync } from 'expo-secure-store'

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

  useEffect(() => {
    const tryToLoadImage = async () => {
      const profilePic = await getItemAsync(PROFILE_PIC_STORE_KEY)
      if (profilePic && profilePic.length) setAvatarUri(profilePic)
    }
    tryToLoadImage()
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

  throw Error('Use this hook in AvatarContextProvider scope')
}

AvatarProvider.displayName = 'AvatarContextProvider'

const PROFILE_PIC_STORE_KEY = 'profile-pic'
