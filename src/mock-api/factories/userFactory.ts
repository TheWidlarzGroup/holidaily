import { Factory } from 'miragejs'

export const userFactory = Factory.extend({
  confirmed: true,
  email: `test-user-${Math.round(Math.random() * 1000)}@gmail.com`,
  firstName: `user-name${Math.round(Math.random() * 1000)}`,
  lastName: `user-lastname${Math.round(Math.random() * 1000)}`,
  occupation: 'dev',
  requests: [],
  userColor: '#FF8B3F',
  language: 'en',
  photo: null,
  role: 'Admin',
  availablePto: Math.round(Math.random() * 24),
  // @ts-ignore
  afterCreate(user, server) {
    server.createList('request', 10, { user })
  },
})

export const usersList = [
  {
    firstName: 'Peter',
    lastName: 'Kansas',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Tom',
    lastName: 'Waist',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Kamila',
    lastName: 'Wysokogórska',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Ola',
    lastName: 'Nowak',
    photo: null,
    occupation: 'Project Manager',
    requests: [],
  },
  {
    firstName: 'Basia',
    lastName: 'Kowalska',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Roberta',
    lastName: 'Gardner',
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Ramon',
    lastName: 'Wheeler',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Ted',
    lastName: 'Rose',
    photo: null,
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Pedro',
    lastName: 'Soto',
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Dolores',
    lastName: 'King',
    photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Bessie',
    lastName: 'Garcia',
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Brent',
    lastName: 'Morris',
    photo: null,
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Melanie',
    lastName: 'Holt',
    photo: 'https://randomuser.me/api/portraits/women/8.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Jimmie',
    lastName: 'Williams',
    photo: 'https://randomuser.me/api/portraits/men/9.jpg',
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Frances',
    lastName: 'Hawkins',
    photo: null,
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Stacey',
    lastName: 'Day',
    photo: 'https://randomuser.me/api/portraits/women/11.jpg',
    occupation: 'Project Manager',
    requests: [],
  },
  {
    firstName: 'Leslie',
    lastName: 'Brown',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Eddie',
    lastName: 'Palmer',
    photo: 'https://randomuser.me/api/portraits/men/13.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Darren',
    lastName: 'Franklin',
    photo: 'https://randomuser.me/api/portraits/men/14.jpg',
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Heather',
    lastName: 'Vargas',
    photo: null,
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Kathryn',
    lastName: 'Dixon',
    photo: 'https://randomuser.me/api/portraits/women/16.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Elmer',
    lastName: 'Gonzalez',
    photo: null,
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Riley',
    lastName: 'Ramos',
    photo: 'https://randomuser.me/api/portraits/men/18.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Deann',
    lastName: 'Montgomery',
    photo: 'https://randomuser.me/api/portraits/men/19.jpg',
    occupation: 'Project Manager',
    requests: [],
  },
  {
    firstName: 'Grace',
    lastName: 'Castillo',
    photo: 'https://randomuser.me/api/portraits/women/20.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Darlene',
    lastName: 'Lawson',
    photo: 'https://randomuser.me/api/portraits/women/21.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Anita',
    lastName: 'Patterson',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Yvonne',
    lastName: 'Dunn',
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Alyssa',
    lastName: 'Richardson',
    photo: null,
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Terri',
    lastName: 'Graves',
    photo: 'https://randomuser.me/api/portraits/men/25.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Marvin',
    lastName: 'Ferguson',
    photo: 'https://randomuser.me/api/portraits/men/26.jpg',
    occupation: 'Project Manager',
    requests: [],
  },
  {
    firstName: 'Jared',
    lastName: 'Oliver',
    photo: 'https://randomuser.me/api/portraits/men/27.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Ray',
    lastName: 'Jacobs',
    photo: 'https://randomuser.me/api/portraits/men/28.jpg',
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Everett',
    lastName: 'Ross',
    photo: 'https://randomuser.me/api/portraits/men/29.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Kev',
    lastName: 'Allen',
    photo: null,
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Hailey',
    lastName: 'Lynch',
    photo: 'https://randomuser.me/api/portraits/women/31.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Dale',
    lastName: 'Steeves',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    occupation: 'UI/UX Designer',
    requests: [],
  },
  {
    firstName: 'Joe',
    lastName: 'Day',
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    occupation: 'Software Engineer',
    requests: [],
  },
  {
    firstName: 'Levi',
    lastName: 'Castillo',
    photo: 'https://randomuser.me/api/portraits/men/34.jpg',
    occupation: 'QA Tester',
    requests: [],
  },
  {
    firstName: 'Lena',
    lastName: 'Morrison',
    photo: 'https://randomuser.me/api/portraits/women/35.jpg',
    occupation: 'Project Manager',
    requests: [],
  },
]
