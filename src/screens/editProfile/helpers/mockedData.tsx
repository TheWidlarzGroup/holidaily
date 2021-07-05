import { UserDetails } from 'types/holidaysDataTypes'

export const USER_DATA: UserDetails = {
  isConfirmed: true,
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

type ColorProps = {
  id: number
  color: string
}

export const COLORS: ColorProps[] = [
  {
    id: 1,
    color: '#FFB051',
  },
  {
    id: 2,
    color: '#FF8B3F',
  },
  {
    id: 3,
    color: '#B9B9B9',
  },
  {
    id: 4,
    color: '#80ED99',
  },
  {
    id: 5,
    color: '#B137EB',
  },
  {
    id: 6,
    color: '#000000',
  },
]
