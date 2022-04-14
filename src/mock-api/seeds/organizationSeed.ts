import { Server } from 'miragejs'
import { genRandomDayOffRequest } from 'mockApi/factories/requestFactory'
import { Schema } from 'mockApi/models'

export const organizationSeed = (context: Server<Schema>) => {
  const users = usersList.map((user) => {
    const userRecord = context.create('user', {
      ...user,
    })
    context.create('request', { ...genRandomDayOffRequest(), user: userRecord })
    return userRecord
  })
  const team1 = context.create('team', {
    name: 'SmartSoft',
    users: users.slice(0, 6),
  })
  const team2 = context.create('team', {
    name: 'FileCode',
    users: users.slice(4, 10),
  })
  const team3 = context.create('team', {
    name: 'Softlab',
    users: users.slice(7, 13),
  })
  const team4 = context.create('team', {
    name: 'Open Byte',
    users: users.slice(11, 16),
  })
  const team5 = context.create('team', {
    name: 'Spaceware',
    users: users.slice(15, 22),
  })
  const team6 = context.create('team', {
    name: 'Webrain',
    users: users.slice(22, 27),
  })
  const team7 = context.create('team', {
    name: 'Pharmic',
    users: users.slice(27, 32),
  })
  const team8 = context.create('team', {
    name: 'NMedical',
    users: users.slice(30, 37),
  })
  const team9 = context.create('team', {
    name: 'Encrypto',
    users: users.slice(36, 40),
  })
  context.create('organization', {
    name: 'Supercompany',
    maxPtoDays: 30,
    // @ts-ignore
    teams: [team1, team2, team3, team4, team5, team6, team7, team8, team9],
  })
}

const usersList = [
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
    photo: 'https://randomuser.me/api/portraits/men/10.jpg',
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
    photo: 'https://randomuser.me/api/portraits/men/11.jpg',
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
    photo: 'https://randomuser.me/api/portraits/men/15.jpg',
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
    photo: 'https://randomuser.me/api/portraits/women/15.jpg',
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
    photo: 'https://randomuser.me/api/portraits/men/17.jpg',
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
    photo: 'https://randomuser.me/api/portraits/women/24.jpg',
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
    photo: 'https://randomuser.me/api/portraits/men/30.jpg',
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
