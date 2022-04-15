import { UserDetails } from 'types/holidaysDataTypes'

export const USER_DATA: UserDetails = {
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
}
type ColorProps = {
  id: number
  color: string
}

export const COLORS: ColorProps[] = [
  {
    color: '#EE4A16',
    id: 1,
  },
  {
    color: '#F47B23',
    id: 2,
  },
  {
    color: '#57B687',
    id: 3,
  },
  {
    color: '#FDC5F5',
    id: 4,
  },
  {
    color: '#C1C4CA',
    id: 5,
  },
  {
    color: '#4E70FF',
    id: 6,
  },
  {
    color: '#EE4A16',
    id: 7,
  },
  {
    color: '#F47B23',
    id: 8,
  },
  {
    color: '#57B687',
    id: 9,
  },
  {
    color: '#FDC5F5',
    id: 10,
  },
  {
    color: '#C1C4CA',
    id: 11,
  },
  {
    color: '#4E70FF',
    id: 12,
  },
]
