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
    color: '#91A6FF',
    id: 1,
  },
  {
    color: '#4E70FF',
    id: 2,
  },
  {
    color: '#FF88DC',
    id: 3,
  },
  {
    color: '#80ED99',
    id: 4,
  },
  {
    color: '#FAFF7F',
    id: 5,
  },
  {
    color: '#E5ED22',
    id: 6,
  },
  {
    color: '#EE4A16',
    id: 7,
  },
  {
    color: '#E522AC',
    id: 8,
  },
  {
    color: '#001D96',
    id: 9,
  },
  {
    color: '#B7FF7F',
    id: 10,
  },
  {
    color: '#B137EB',
    id: 11,
  },
  {
    color: '#3BEFB9',
    id: 12,
  },
]
