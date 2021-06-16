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
  id: string
  author: UserData
  timestamp: Timestamp
}

export type Reaction = {
  meta: PostMetaData
  type: ReactionType
}

export enum ReactionType {
  ANGRY = 'angry',
  SMILE = 'smile',
  THUMB_UP = 'thumb_up',
  THUMB_DOWN = 'thumb_down',
}

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

export enum FeedPostDataType {
  IMAGE = 'image',
  VIDEO = 'video',
}
