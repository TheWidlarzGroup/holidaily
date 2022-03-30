import { CompoundLocation } from 'hooks/useLocation'

type UserData = { id: string; name: string; occupation: string; pictureUrl: string | null }

export type Timestamp = {
  createdAt: Date
}

export type MetaData = {
  id: string
  author: UserData
  timestamp: Timestamp
  location?: CompoundLocation
}

export type Reaction = {
  type: string
  users: string[]
}

export type Comment = {
  meta: MetaData
  text: string
}

export type FeedPost = {
  meta: MetaData
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
