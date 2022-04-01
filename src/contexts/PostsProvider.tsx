import React, { ReactNode, useState, useCallback } from 'react'
import { FeedPost } from 'mockApi/models/miragePostTypes'
import { ContextProps, PostsContext } from './PostsContext'

type ProviderProps = {
  children: ReactNode
}

export const PostsContextProvider = ({ children }: ProviderProps) => {
  const [posts, setPosts] = useState<FeedPost[] | null>(null)

  const updatePosts = useCallback((newData: FeedPost[]) => {
    setPosts((prev) => (prev ? [...prev, ...newData] : newData))
  }, [])

  const value: ContextProps = { posts, updatePosts }
  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}
