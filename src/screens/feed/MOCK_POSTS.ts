import { FeedPost } from 'mockApi/models/miragePostTypes'

export const MOCK_POSTS: FeedPost[] = [
  {
    meta: {
      id: '1',
      author: {
        id: '1',
        occupation: 'Software Engineer',
        name: 'Ramon Wheeler',
        pictureUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      timestamp: {
        createdAt: new Date(),
      },
    },
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit.',
    data: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1617731653770-a62c51cf8696?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1623764802787-eea7b530c90a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
            occupation: 'Software Engineer',
            name: 'Melanie Holt',
            pictureUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
          },
          timestamp: {
            createdAt: new Date(),
          },
        },
        text: 'Awesome!!',
      },
      {
        meta: {
          id: '2',
          author: {
            id: '1',
            occupation: 'QA Tester',
            name: 'Brent Morris',
            pictureUrl: null,
          },
          timestamp: {
            createdAt: new Date(),
          },
        },
        text: 'Cool',
      },
    ],
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
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum illo architecto maxime inventore ex non exercitationem soluta. Aperiam accusamus iure sed velit, asperiores sapiente soluta consequatur, rerum debitis eligendi odit adipisci quaerat! Illo laudantium repellendus ducimus molestiae similique modi voluptatibus voluptates cupiditate, esse quis mollitia dolore doloremque officiis excepturi quia? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit.',
    data: [],
    reactions: [],
    comments: [],
  },
  {
    meta: {
      id: '3',
      author: {
        id: '1',
        occupation: 'Software Engineer',
        name: 'Bessie Garcia',
        pictureUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
      },
      timestamp: {
        createdAt: new Date(2022, 2, 28),
      },
    },
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit. Dicta optio non praesentium consequuntur saepe magnam eum cumque excepturi nobis reprehenderit.',
    data: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1617731653770-a62c51cf8696?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
            occupation: 'QA Tester',
            name: 'Frances Hawkins',
            pictureUrl: null,
          },
          timestamp: {
            createdAt: new Date(2022, 2, 28),
          },
        },
        text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi earum illo, incidunt aperiam adipisci vel.',
      },
    ],
  },
]
