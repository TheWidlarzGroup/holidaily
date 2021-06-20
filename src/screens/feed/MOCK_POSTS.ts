import { FeedPost } from './types'

export const MOCK_POSTS: FeedPost[] = [
  {
    meta: {
      id: '1',
      author: {
        id: '1',
        firstName: 'Actor / Director',
        lastName: 'Jack Nickolson',
        pictureUrl:
          'https://images.unsplash.com/photo-1623790679437-72cbde564d59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      timestamp: {
        createdAt: new Date(),
        editedAt: new Date(),
      },
    },
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit.',
    data: [
      {
        type: 'image',
        src:
          'https://images.unsplash.com/photo-1617731653770-a62c51cf8696?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        type: 'image',
        src:
          'https://images.unsplash.com/photo-1623764802787-eea7b530c90a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
    reactions: [
      {
        type: '😍',
        users: ['1', '2', '3', '4'],
      },
      {
        type: '😀',
        users: ['1', '2', '3', '4'],
      },
    ],
    comments: [
      {
        meta: {
          id: '1',
          author: {
            id: '1',
            firstName: 'Actor / Director',
            lastName: 'Jack Nickolson',
            pictureUrl:
              'https://images.unsplash.com/photo-1623790679437-72cbde564d59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
          timestamp: {
            createdAt: new Date(),
            editedAt: new Date(),
          },
        },
        comments: [],
        reactions: [],
        text: 'Hello darkness',
      },
      {
        meta: {
          id: '2',
          author: {
            id: '1',
            firstName: 'Actor / Director',
            lastName: 'Jack Nickolson',
            pictureUrl:
              'https://images.unsplash.com/photo-1623790679437-72cbde564d59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
          timestamp: {
            createdAt: new Date(),
            editedAt: new Date(),
          },
        },
        comments: [],
        reactions: [],
        text: 'Hello darkness',
      },
    ],
  },
  {
    meta: {
      id: '3',
      author: {
        id: '1',
        firstName: 'Real Hero',
        lastName: 'Maria Curie-Skłodowska',
        pictureUrl:
          'https://images.unsplash.com/photo-1623790679437-72cbde564d59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      timestamp: {
        createdAt: new Date(),
        editedAt: new Date(),
      },
    },
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum illo architecto maxime inventore ex non exercitationem soluta. Aperiam accusamus iure sed velit, asperiores sapiente soluta consequatur, rerum debitis eligendi odit adipisci quaerat! Illo laudantium repellendus ducimus molestiae similique modi voluptatibus voluptates cupiditate, esse quis mollitia dolore doloremque officiis excepturi quia? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit.',
    data: [],
    reactions: [],
    comments: [],
  },
  {
    meta: {
      id: '2',
      author: {
        id: '1',
        firstName: 'Mythic Hero',
        lastName: 'Oedipus',
        pictureUrl:
          'https://images.unsplash.com/photo-1623790679437-72cbde564d59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      timestamp: {
        createdAt: new Date(),
        editedAt: new Date(),
      },
    },
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit.',
    data: [
      {
        type: 'image',
        src:
          'https://images.unsplash.com/photo-1617731653770-a62c51cf8696?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
    reactions: [
      {
        type: '😍',
        users: ['1', '2', '3', '4'],
      },
      {
        type: '😀',
        users: ['1', '2', '3', '4'],
      },
    ],
    comments: [
      {
        meta: {
          id: '1',
          author: {
            id: '1',
            firstName: 'Mythic Hero',
            lastName: 'Oedipus',
            pictureUrl:
              'https://images.unsplash.com/photo-1623790679437-72cbde564d59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
          timestamp: {
            createdAt: new Date(),
            editedAt: new Date(),
          },
        },
        comments: [],
        text:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi earum illo, incidunt aperiam adipisci vel.',
        reactions: [
          {
            type: '😀',
            users: ['1', '2', '3', '4'],
          },
          {
            type: '😎',
            users: ['1', '2', '3', '4'],
          },
        ],
      },
    ],
  },
]
