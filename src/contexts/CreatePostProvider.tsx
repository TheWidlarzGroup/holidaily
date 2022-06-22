import { FeedPost } from 'mockApi/models/miragePostTypes'
import React, { ReactNode, useState } from 'react'
import { CreatePostContext, CreatePostContextProps } from './CreatePostContext'

type CreatePostProviderProps = {
  children: ReactNode
}

const emptyPostData: FeedPost = {
  id: '00',
  author: {
    id: '00',
    occupation: 'Software Engineer',
    name: 'A B',
    pictureUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  createdAt: new Date().getTime(),
  text: '',
  data: [],
  reactions: [],
  comments: [],
}

export const CreatePostProvider = ({ children }: CreatePostProviderProps) => {
  const [postData, setPostData] = useState<FeedPost>(emptyPostData)

  const updatePostData = (newData: Partial<FeedPost> | null) => {
    setPostData((prevSettings) =>
      prevSettings ? { ...prevSettings, ...newData } : { ...emptyPostData, ...newData }
    )
  }

  const value: CreatePostContextProps = { postData, updatePostData }
  return <CreatePostContext.Provider value={value}>{children}</CreatePostContext.Provider>
}
