import { createContext } from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'

export type ContextProps = {
  posts: FeedPost[] | null
  updatePosts: (newData: FeedPost[]) => void
}

export const PostsContext = createContext<ContextProps | null>(null)
