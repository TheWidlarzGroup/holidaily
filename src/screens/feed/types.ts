import { CompoundLocation } from 'hooks/useLocation'
import { UserData as DefaultUserData } from 'types/holidaysDataTypes'

type UserData = DefaultUserData & { pictureUrl: string | null }

export type Timestamp = {
  createdAt: Date
  editedAt: Date
}

export type PostMetaData = {
  id: string
  author: UserData
  timestamp: Timestamp
  location?: CompoundLocation
}

export type Reaction = {
  type: ReactionType
  users: string[]
}

export type ReactionType = '😋' | '😎' | '😍' | '😀'

export type Comment = {
  meta: PostMetaData
  comments: Comment[]
  text: string
  reactions: Reaction[]
}

export type FeedPost = {
  meta: PostMetaData
  comments: Comment[]
  data: FeedPostData[]
  text: string
  reactions: Reaction[]
}

export type FeedPostData = {
  type: FeedPostDataType
  src: string
}

export type FeedPostDataType = 'image' | 'video'
