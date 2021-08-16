import { UserDetails } from 'types/holidaysDataTypes'

export const USER_DATA: UserDetails & { isConfirmed: boolean } = {
  isConfirmed: true,
  id: '1',
  firstName: 'Kamila',
  lastName: 'Wysokogórska',
  occupation: 'Software Developer',
  holidays: {
    id: 1,
    isOnHoliday: false,
    dayStart: '21-10-2021',
    dayEnd: '29-10-2021',
  },
  teams: ['Smartsoft', 'Akademia'],
  photo: null,
}

export const TEAM_MATES_AKADEMIA = [
  {
    id: 'user6',
    firstName: 'Paweł',
    lastName: 'Ogonek',
    holidays: {
      id: 6,
      isOnHoliday: false,
      dayStart: '2021-06-22',
      dayEnd: '2021-06-24',
    },
    occupation: 'Software Developer',
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
    occupation: 'Software Developer',
  },
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
    occupation: 'Software Developer',
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
    occupation: 'Software Developer',
  },
  {
    id: 'user4',
    firstName: 'Ola',
    lastName: 'Nowak',
    holidays: {
      id: 4,
      isOnHoliday: true,
      dayStart: '2021-06-10',
      dayEnd: '2021-06-15',
    },
    occupation: 'Software Developer',
  },
]

export const TEAM_MATES_DEV = [
  {
    id: 'user6',
    firstName: 'Paweł',
    lastName: 'Ogonek',
    holidays: {
      id: 6,
      isOnHoliday: false,
      dayStart: '2021-06-22',
      dayEnd: '2021-06-24',
    },
    occupation: 'Software Developer',
  },
  {
    id: 'user1',
    firstName: 'Peter',
    lastName: 'Kansas',
    holidays: {
      id: 1,
      isOnHoliday: false,
      dayStart: '2021-06-01',
      dayEnd: '2021-06-14',
    },
    occupation: 'Software Developer',
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
    occupation: 'Software Developer',
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
    occupation: 'Software Developer',
  },
]
