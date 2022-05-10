import { Server } from 'miragejs'
import { Comment, FeedPost, Reaction, Schema } from 'mockApi/models'
import { sourcePeter } from './notificationSources'

export const postsSeed = (context: Server<Schema>) => {
  // @ts-ignore
  const reactions = reactionsMock.map((reaction) => context.create('reaction', reaction))
  // @ts-ignore
  const comments = commentsMock.map((comment) => context.create('comment', comment))
  context.create('post', {
    ...postsMock[0],
    comments: [comments[0]],
    reactions: [reactions[0], reactions[1], reactions[2]],
  })
  context.create('post', { ...postsMock[1], comments: [comments[1]], reactions: [reactions[3]] })
  context.create('post', {
    ...postsMock[2],
    comments: [comments[2], comments[3]],
    reactions: [reactions[4], reactions[5], reactions[6]],
  })
}

export const postsMock: FeedPost[] = [
  {
    meta: {
      id: '1',
      author: {
        id: '1',
        occupation: 'Project Manager',
        name: 'Lena Morrison',
        pictureUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
      },
      timestamp: {
        createdAt: new Date(),
      },
    },
    text: 'Hope it will make you hungry guys! :D Greetings from Porto!',
    data: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1562250883-5b8fa0be26ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1536663815808-535e2280d2c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1503075131240-fe4b3a7fa473?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1535911062411-3280a2af5b51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      },
    ],
    reactions: [],
    comments: [],
  },
  {
    meta: {
      id: '2',
      author: {
        id: '1',
        occupation: 'UI/UX Designer',
        name: 'Dolores King',
        pictureUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
      },
      timestamp: {
        createdAt: new Date(2022, 3, 10),
      },
    },
    text: 'Having fun in Venice',
    data: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      },
    ],
    reactions: [],
    comments: [],
  },
  {
    meta: {
      id: '3',
      author: {
        id: '1',
        occupation: 'Software Engineer',
        name: 'Ramon Wheeler',
        pictureUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      timestamp: {
        createdAt: new Date(2022, 2, 28),
      },
    },
    text: 'Chill :)',
    data: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1533929702053-9986939ea193?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
      },
    ],
    reactions: [],
    comments: [],
  },
]

export const commentsMock: Comment[] = [
  {
    meta: {
      id: '2',
      author: {
        id: '1',
        occupation: 'QA Tester',
        name: 'Brent Morris',
        pictureUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
      },
      timestamp: {
        createdAt: new Date(),
      },
    },
    text: 'Cool',
  },
  {
    meta: {
      id: '1',
      author: {
        id: '1',
        occupation: 'Software Engineer',
        name: 'Melanie Holt',
        pictureUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
      },
      timestamp: {
        createdAt: new Date(),
      },
    },
    text: 'Venice is awesome!!',
  },
  {
    meta: {
      id: '1',
      author: {
        id: '1',
        occupation: 'QA Tester',
        name: 'Frances Hawkins',
        pictureUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
      },
      timestamp: {
        createdAt: new Date(),
      },
    },
    text: 'Nice flowers',
  },
  {
    meta: {
      id: '4',
      author: {
        id: sourcePeter.id,
        occupation: sourcePeter.occupation,
        name: `${sourcePeter.firstName} ${sourcePeter.lastName}`,
        pictureUrl: sourcePeter.photo,
      },
      timestamp: {
        createdAt: new Date(),
      },
    },
    text: "Oh boy, that's what I call relax",
  },
]

export const reactionsMock: Reaction[] = [
  {
    type: '😍',
    users: ['1', '2', '3', '4'],
  },
  {
    type: '😙',
    users: ['1'],
  },
  {
    type: '🥂',
    users: ['1', '2', '3'],
  },
  {
    type: '😲',
    users: ['1', '2', '3'],
  },
  {
    type: '😍',
    users: ['1', '2'],
  },
  {
    type: '🌿',
    users: ['1', '2'],
  },
  {
    type: '🎵',
    users: ['1'],
  },
]
