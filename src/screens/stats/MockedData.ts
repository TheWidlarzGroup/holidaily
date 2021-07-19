import { Additional } from './components/Request'
import { StatusTypes } from './components/Status'

type RequestProps = {
  key: number
  title: string
  startDate: string
  endDate: string
  status: StatusTypes
  additionals?: Additional[]
}

export const MOCKED_STATS = {
  ptoLeft: 15,
  ptoUsed: 6,
  sickDaysUsed: 2,
}
export const MOCKED_REQUESTS: RequestProps[] = [
  {
    key: 1,
    title: 'Day off',
    startDate: '2021-07-01',
    endDate: '2021-07-12',
    status: 'Now',
  },
  {
    key: 2,
    title: 'Hiking the Tatras',
    startDate: '2021-06-01',
    endDate: '2021-07-01',
    status: 'Approved',
  },
  {
    key: 3,
    title: 'Day off',
    startDate: '2020-12-28',
    endDate: '2021-01-03',
    status: 'Pending',
  },
  {
    key: 4,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
  {
    key: 5,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
  {
    key: 6,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
  {
    key: 7,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
  {
    key: 8,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
  {
    key: 9,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
  {
    key: 10,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
  {
    key: 11,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
  {
    key: 12,
    title: 'Hiking the Tatras',
    startDate: '2021-07-01',
    endDate: '2021-07-01',
    status: 'Past',
  },
]
