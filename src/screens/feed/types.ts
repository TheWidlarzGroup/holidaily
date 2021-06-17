import { UserData } from 'types/holidaysDataTypes'

export type Timestamp = {
  createdAt: Date
  editedAt: Date
}

export type PostMetaData = {
  id: string
  author: UserData
  timestamp: Timestamp
}

export type Reaction = {
  meta: PostMetaData
  type: ReactionType
}

export type ReactionType = 'angry' | 'smile' | 'thumb_up' | 'thumb_down'

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
