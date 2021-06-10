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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
        holidays: {},
      },
      {
        id: 'user1',
        firstName: 'Peter',
        lastName: 'Kansas',
        holidays: {
          id: 1,
          isOnHoliday: true,
          dayStart: '2021-06-01',
          dayEnd: '2021-06-14',
        },
      },
      {
        id: 'user2',
        firstName: 'Tom',
        lastName: 'Waist',
        holidays: {
          id: 2,
          isOnHoliday: false,
          dayStart: '2021-06-04',
          dayEnd: '2021-06-10',
        },
      },
      {
        id: 'user3',
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        holidays: {},
      },
      {
        id: 'user4',
        firstName: 'Ola',
        lastName: 'Nowak',
        holidays: {},
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
        holidays: {
          id: 2,
          isOnHoliday: true,
          dayStart: '2021-06-04',
          dayEnd: '2021-06-10',
        },
      },
      {
        id: 'user3',
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        holidays: {
          id: 3,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
        },
      },
      {
        id: 'user4',
        firstName: 'Ola',
        lastName: 'Nowak',
        holidays: {
          id: 4,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
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
        holidays: {
          id: 2,
          isOnHoliday: true,
          dayStart: '2021-06-04',
          dayEnd: '2021-06-10',
        },
      },
      {
        id: 'user3',
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        holidays: {
          id: 3,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
        },
      },
      {
        id: 'user4',
        firstName: 'Ola',
        lastName: 'Nowak',
        holidays: {
          id: 4,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
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
        holidays: {
          id: 2,
          isOnHoliday: true,
          dayStart: '2021-06-04',
          dayEnd: '2021-06-10',
        },
      },
      {
        id: 'user3',
        firstName: 'Kamila',
        lastName: 'Wysokogórska',
        holidays: {
          id: 3,
          isOnHoliday: true,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
        },
      },
      {
        id: 'user4',
        firstName: 'Ola',
        lastName: 'Nowak',
        holidays: {
          id: 4,
          isOnHoliday: false,
          dayStart: '2021-06-10',
          dayEnd: '2021-06-15',
        },
      },
    ],
  },
]
