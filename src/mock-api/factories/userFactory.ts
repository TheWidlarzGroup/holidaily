import { Factory } from 'miragejs'

export const userFactory = Factory.extend({
  confirmed: true,
  email: `test-user-${Math.round(Math.random() * 1000)}@gmail.com`,
  firstName: `user-name${Math.round(Math.random() * 1000)}`,
  lastName: `user-lastname${Math.round(Math.random() * 1000)}`,
  occupation: 'dev',
  color: '#FF8B3F',
  language: 'en',
  photo: null,
  role: 'Admin',
  // @ts-ignore
  afterCreate(user, server) {
    server.createList('request', 10, { user })
  },
})

export const usersList = [
  {
    firstName: 'Peter',
    lastName: 'Kansas',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Tom',
    lastName: 'Waist',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Kamila',
    lastName: 'Wysokogórska',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Ola',
    lastName: 'Nowak',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Basia',
    lastName: 'Wysokogórska-Nowak',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Roberta',
    lastName: 'Gardner',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Ramon',
    lastName: 'Wheeler',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Ted',
    lastName: 'Rose',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Pedro',
    lastName: 'Soto',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Dolores',
    lastName: 'King',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Bessie',
    lastName: 'Garcia',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Brent',
    lastName: 'Morris',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Melanie',
    lastName: 'Holt',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Jimmie',
    lastName: 'Williams',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Frances',
    lastName: 'Hawkins',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Stacey ',
    lastName: 'Day',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Leslie',
    lastName: 'Brown',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Eddie',
    lastName: 'Palmer',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Darren',
    lastName: 'Franklin',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Heather',
    lastName: 'Vargas',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Kathryn',
    lastName: 'Dixon',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Elmer',
    lastName: 'Gonzalez',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Riley',
    lastName: 'Ramos',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Deann ',
    lastName: 'Montgomery',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Grace',
    lastName: 'Castillo',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Darlene',
    lastName: 'Lawson',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Anita Patterson',
    lastName: '',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Yvonne',
    lastName: 'Dunn',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Alyssa',
    lastName: 'Richardson',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Terri',
    lastName: 'Graves',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Marvin',
    lastName: 'Ferguson',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Jared',
    lastName: 'Oliver',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Ray',
    lastName: 'Jacobs',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Everett ',
    lastName: 'Ross',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Kev',
    lastName: 'Allen',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Hailey',
    lastName: 'Lynch',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Dale',
    lastName: 'Steeves',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Joe Day',
    lastName: '',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Levi',
    lastName: 'Castillo',
    photo: null,
    occupation: 'Software Engineer',
  },
  {
    firstName: 'Lena',
    lastName: 'Morrison',
    photo: null,
    occupation: 'Software Engineer',
  },
]
