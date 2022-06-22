import { FeedPost } from 'mockApi/models'
import { createContext } from 'react'

export type CreatePostContextProps = {
  postData: FeedPost
  updatePostData: F1<FeedPost>
}

export const CreatePostContext = createContext<CreatePostContextProps | null>(null)
