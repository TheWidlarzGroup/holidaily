export type UserData = {
  id: string
  firstName: string
  lastName: string
}

export type Timestamp = {
  createdAt: Date
  editedAt: Date
}

// Is Timestamp needed here?
export type Reaction = {
  author: UserData
  type: 'angry' | 'thumb' | 'smile' | string
}

export type Comment = Timestamp & {
  author: UserData
  comments: Comment[]
  text: string
  reactions: Reaction[]
}

export type Feed = Timestamp & {
  author: UserData
  comments: Comment[]
  data: FeedData[]
  text: string
  reactions: Reaction[]
}

export type FeedData = {
  type: 'image' | 'video'
  src: string
}
