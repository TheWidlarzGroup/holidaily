import { FeedPost } from 'mockApi/models'
import { createContext } from 'react'

export type CreatePostContextProps = {
  postData: FeedPost | null
  updatePostData: F1<Partial<FeedPost> | null>
  removePostAsset: F1<string>
}

export const CreatePostContext = createContext<CreatePostContextProps | null>(null)
