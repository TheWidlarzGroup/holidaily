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
    startDate: '21-10-2021',
    endDate: '29-10-2021',
  },
  teams: ['Smartsoft', 'Akademia'],
  photo: null,
}

export const TEAM_MATES_AKADEMIA = [
  {
    id: '',
    firstName: 'Paweł',
    lastName: 'Ogonek',
    photo: null,
    email: '',
    confirmed: true,
    occupation: '',
    userColor: '',
    language: 'pl',
    role: 'Admin',
    requests: [],
    teams: [],
  },
]

export const TEAM_MATES_DEV = [
  {
    id: '',
    firstName: 'Paweł',
    lastName: 'Ogonek',
    photo: null,
    email: '',
    confirmed: true,
    occupation: '',
    userColor: '',
    language: 'pl',
    role: 'Admin',
    requests: [],
    teams: [],
  },
]
