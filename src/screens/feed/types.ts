export type UserData = {
  id: string
  firstName: string
  lastName: string
}

export type Timestamp = {
  createdAt: Date
  editedAt: Date
}

export type PostMetaData = {
  author: UserData
  timestamp: Timestamp
}

export type Reaction = {
  meta: PostMetaData
  type: ReactionType
}

export type ReactionType = 'angry' | 'thumb' | 'smile' | string

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
