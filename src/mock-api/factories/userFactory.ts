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
    occupation: 'UI/UX Designer',
  },
  {
    firstName: 'Kamila',
    lastName: 'Wysokogórska',
    photo: null,
    occupation: 'QA Tester',
  },
  {
    firstName: 'Ola',
    lastName: 'Nowak',
    photo: null,
    occupation: 'Project Manager',
  },
  {
    firstName: 'Basia',
    lastName: 'Wysokogórska-Nowak',
    photo: null,
    occupation: 'UI/UX Designer',
  },
  {
    firstName: 'Roberta',
    lastName: 'Gardner',
    photo: null,
    occupation: 'QA Tester',
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
    occupation: 'QA Tester',
  },
  {
    firstName: 'Dolores',
    lastName: 'King',
    photo: null,
    occupation: 'UI/UX Designer',
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
    occupation: 'QA Tester',
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
    occupation: 'UI/UX Designer',
  },
  {
    firstName: 'Frances',
    lastName: 'Hawkins',
    photo: null,
    occupation: 'QA Tester',
  },
  {
    firstName: 'Stacey ',
    lastName: 'Day',
    photo: null,
    occupation: 'Project Manager',
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
    occupation: 'QA Tester',
  },
  {
    firstName: 'Darren',
    lastName: 'Franklin',
    photo: null,
    occupation: 'UI/UX Designer',
  },
  {
    firstName: 'Heather',
    lastName: 'Vargas',
    photo: null,
    occupation: 'QA Tester',
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
    occupation: 'UI/UX Designer',
  },
  {
    firstName: 'Riley',
    lastName: 'Ramos',
    photo: null,
    occupation: 'QA Tester',
  },
  {
    firstName: 'Deann ',
    lastName: 'Montgomery',
    photo: null,
    occupation: 'Project Manager',
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
    occupation: 'QA Tester',
  },
  {
    firstName: 'Anita Patterson',
    lastName: '',
    photo: null,
    occupation: 'UI/UX Designer',
  },
  {
    firstName: 'Yvonne',
    lastName: 'Dunn',
    photo: null,
    occupation: 'QA Tester',
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
    occupation: 'Project Manager',
  },
  {
    firstName: 'Jared',
    lastName: 'Oliver',
    photo: null,
    occupation: 'QA Tester',
  },
  {
    firstName: 'Ray',
    lastName: 'Jacobs',
    photo: null,
    occupation: 'UI/UX Designer',
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
    occupation: 'QA Tester',
  },
  {
    firstName: 'Dale',
    lastName: 'Steeves',
    photo: null,
    occupation: 'UI/UX Designer',
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
    occupation: 'QA Tester',
  },
  {
    firstName: 'Lena',
    lastName: 'Morrison',
    photo: null,
    occupation: 'Project Manager',
  },
]
