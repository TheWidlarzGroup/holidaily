import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { FeedPost } from 'mockApi/models/miragePostTypes'
import React, { ReactNode, useState } from 'react'
import { generateUUID } from 'utils/generateUUID'
import { CreatePostContext, CreatePostContextProps } from './CreatePostContext'

type CreatePostProviderProps = {
  children: ReactNode
}

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const [postData, setPostData] = useState<FeedPost | null>(null)
  const { user } = useUserContext()

  const emptyPostData: FeedPost = {
    id: generateUUID(),
    author: {
      id: user?.id || '',
      occupation: user?.occupation || '',
      name: `${user?.firstName} ${user?.lastName}`,
      pictureUrl: user?.photo || '',
      userColor: user?.userColor,
    },
    createdAt: new Date().getTime(),
    text: '',
    data: [],
    reactions: [],
    comments: [],
  }

  const updatePostData = (newData: Partial<FeedPost> | null) => {
    setPostData((prevSettings) =>
      prevSettings ? { ...prevSettings, ...newData } : { ...emptyPostData, ...newData }
    )
  }

  const removePostAsset = (id: string) => {
    if (!postData) return
    const filteredAssets = postData.data.filter((asset) => asset.id !== id)
    updatePostData({ data: filteredAssets })
  }

  const value: CreatePostContextProps = { postData, updatePostData, removePostAsset }
  return <CreatePostContext.Provider value={value}>{children}</CreatePostContext.Provider>
}
