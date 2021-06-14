import { UserDetails } from 'types/holidaysDataTypes'

export const USER_DATA: UserDetails = {
  id: '1',
  firstName: 'Kamila',
  lastName: 'Wysokogórska',
  role: 'Software Developer',
  holidays: {
    id: 1,
    isOnHoliday: false,
    dayStart: '21-10-2021',
    dayEnd: '29-10-2021',
  },
  teams: ['Smartsoft', 'Akademia'],
}
