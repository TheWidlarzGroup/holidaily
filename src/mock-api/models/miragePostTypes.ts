import { CompoundLocation } from 'hooks/useLocation'
import { User } from './mirageTypes'

type UserData = {
  id: string
  name: string
  occupation: string
  pictureUrl: User['photo']
  userColor?: string
  lastName?: string
}

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

export type AddComment = {
  postId: string
  comment: Comment
}
export type AddReaction = {
  postId: string
  reaction: Reaction
}

export type FeedPost = {
  id?: string
  recentlyAdded?: boolean
  meta: MetaData
  comments: Comment[]
  data: FeedPostData[]
  text: string
  reactions: Reaction[]
}

export type FeedPostData = {
  type: FeedPostDataType
  uri: string
  id: string
}

export type FeedPostDataType = 'image' | 'video'

export type EditComment = {
  type?: 'comment'
  postId: string
  commentId: string
  author?: string
  text?: string
}

type EditPost = {
  type: 'post'
  author: string
  postId: string
}

export type EditTargetType = EditComment | EditPost
