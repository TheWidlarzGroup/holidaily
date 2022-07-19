import { LocationGeocodedAddress } from 'expo-location'
import { User } from './mirageTypes'

type UserData = {
  id: string
  name: string
  occupation: string
  pictureUrl: User['photo']
  userColor?: string
  lastName?: string
}

export type Reaction = {
  type: string
  users: string[]
}

export type Comment = {
  id: string
  author: UserData
  createdAt: number
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
  id: string
  author: UserData
  createdAt: number
  comments: Comment[]
  data: AttachmentDataType[]
  text: string
  reactions: Reaction[]
  location?: LocationGeocodedAddress
  recentlyAdded?: boolean
}

export type AttachmentDataType = {
  uri: string
  id: string
  type?: AttachmentType
}

export type AttachmentType = 'image' | 'video'

export type EditComment = {
  type: 'comment'
  postId: string
  commentId: string
  authorId?: string
  text?: string
}

export type EditPost = {
  type: 'post'
  authorId: string
  postId: string
}

export type EditTargetType = EditComment | EditPost
