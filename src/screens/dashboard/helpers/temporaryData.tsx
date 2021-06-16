export const COMPANY_DAYS_OFF = [
  {
    id: 1,
    isOnHoliday: true,
    dayStart: '2021-06-01',
    dayEnd: '2021-06-13',
    user: {
      id: 'user1',
      firstName: 'Peter',
      lastName: 'Kansas',
      picture: undefined,
    },
    role: 'Software Developer',
  },
  {
    id: 2,
    isOnHoliday: true,
    dayStart: '2021-06-10',
    dayEnd: '2021-07-10',
    user: {
      id: 'user2',
      firstName: 'Tom',
      lastName: 'Waist',
      picture: undefined,
    },
    role: 'Software Developer',
  },
  {
    id: 3,
    isOnHoliday: false,
    dayStart: '2021-06-16',
    dayEnd: '2021-06-20',
    user: {
      id: 'user3',
      firstName: 'Kamila',
      lastName: 'Wysokogórska',
      picture: undefined,
    },
    role: 'Software Developer',
  },
  {
    id: 4,
    isOnHoliday: false,
    dayStart: '2021-06-28',
    dayEnd: '2021-06-29',
    user: {
      id: 'user4',
      firstName: 'Ola',
      lastName: 'Nowak',
      picture: undefined,
    },
    role: 'Software Developer',
  },
  {
    id: 5,
    isOnHoliday: false,
    dayStart: '2021-07-16',
    dayEnd: '2021-07-22',
    user: {
      id: 'user5',
      firstName: 'Ludwik',
      lastName: 'Chodak',
      picture: undefined,
    },
    role: 'Software Developer',
  },
  {
    id: 6,
    isOnHoliday: false,
    dayStart: '2021-07-22',
    dayEnd: '2021-07-24',
    user: {
      id: 'user6',
      firstName: 'Paweł',
      lastName: 'Ogonek',
      picture: undefined,
    },
    role: 'Software Developer',
  },
]

export const USER_GROUPS_DAYS_OFF = [
  {
    groupId: 1,
    groupName: 'Akademia',
    users: [
      {
        id: 'user6',
        firstName: 'Paweł',
        lastName: 'Ogonek',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: false,
          dayStart: '',
          dayEnd: '',
          sickLeave: false,
          description: undefined,
        },
      },
      {
        id: 'user1',
        firstName: 'Peter',
        lastName: 'Kansas',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: true,
          dayStart: '2021-06-14',
          dayEnd: '2021-06-14',
          sickLeave: true,
          description: 'Terrible headache',
        },
      },
      {
        id: 'user9',
        firstName: 'Peter',
        lastName: 'Kansas',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: true,
          dayStart: '2021-06-14',
          dayEnd: '2021-06-14',
          sickLeave: true,
          description: 'Terrible headache',
        },
      },
      {
        id: 'user2',
        firstName: 'Tom',
        lastName: 'Waist',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 2,
          isOnHoliday: false,
          dayStart: '2021-06-04',
          dayEnd: '2021-06-10',
          sickLeave: false,
          description: 'Portugal',
        },
      },
      {
        id: 'user3',
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: false,
          dayStart: '',
          dayEnd: '',
          sickLeave: false,
          description: undefined,
        },
      },
      {
        id: 'user4',
        firstName: 'Ola',
        lastName: 'Nowak',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: false,
          dayStart: '',
          dayEnd: '',
          sickLeave: false,
          description: undefined,
        },
      },
      {
        id: 'user5',
        firstName: 'Kamila',
        lastName: 'Wysokogórska-Nowak',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: false,
          dayStart: '',
          dayEnd: '',
          sickLeave: false,
          description: undefined,
        },
      },
      {
        id: 'user7',
        firstName: 'Ola',
        lastName: 'Nowak',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: false,
          dayStart: '',
          dayEnd: '',
          sickLeave: false,
          description: undefined,
        },
      },
      {
        id: 'user8',
        firstName: 'Ola',
        lastName: 'Nowak',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: false,
          dayStart: '',
          dayEnd: '',
          sickLeave: false,
          description: undefined,
        },
      },
    ],
  },
  {
    groupId: 2,
    groupName: 'SmartSoft',
    users: [
      {
        id: 'user2',
        firstName: 'Tom',
        lastName: 'Waist',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 2,
          isOnHoliday: true,
          dayStart: '2021-06-04',
          dayEnd: '2021-06-10',
          sickLeave: true,
          description: 'Broken arm',
        },
      },
      {
        id: 'user3',
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        picture: undefined,
        role: 'Office Manager',
        holidays: {
          id: 3,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
          sickLeave: false,
          description: 'Mountain trip',
        },
      },
      {
        id: 'user4',
        firstName: 'Ola',
        lastName: 'Nowak',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 4,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
          sickLeave: false,
          description: undefined,
        },
      },
    ],
  },
  {
    groupId: 3,
    groupName: 'Devs',
    users: [
      {
        id: 'user2',
        firstName: 'Tom',
        lastName: 'Waist',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 1,
          isOnHoliday: false,
          dayStart: '',
          dayEnd: '',
          sickLeave: false,
          description: undefined,
        },
      },
      {
        id: 'user3',
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 3,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
          sickLeave: false,
          description: 'Kayaking',
        },
      },
      {
        id: 'user4',
        firstName: 'Ola',
        lastName: 'Nowak',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 4,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-30',
          sickLeave: false,
          description: 'Indonesia',
        },
      },
    ],
  },
  {
    groupId: 4,
    groupName: 'Company',
    users: [
      {
        id: 'user2',
        firstName: 'Tom',
        lastName: 'Waist',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 2,
          isOnHoliday: true,
          dayStart: '2021-06-04',
          dayEnd: '2021-06-10',
          sickLeave: false,
          description: undefined,
        },
      },
      {
        id: 'user3',
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 3,
          isOnHoliday: true,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
          sickLeave: false,
          description: undefined,
        },
      },
      {
        id: 'user4',
        firstName: 'Ola',
        lastName: 'Nowak',
        picture: undefined,
        role: 'Software Engineer',
        holidays: {
          id: 4,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
          sickLeave: false,
          description: undefined,
        },
      },
    ],
  },
]
