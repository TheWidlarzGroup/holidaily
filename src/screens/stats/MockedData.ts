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

export const MOCKED_REQUESTS: RequestProps[] = [
  {
    key: 1,
    title: 'Day off',
    startDate: '02-05-2021',
    endDate: '02-05-2021',
    status: 'Now',
  },
  {
    key: 2,
    title: 'Hiking the Tatras',
    startDate: '02-05-2021',
    endDate: '02-05-2021',
    status: 'Approved',
  },
  {
    key: 3,
    title: 'Day off',
    startDate: '02-05-2021',
    endDate: '02-05-2021',
    status: 'Pending',
  },
  {
    key: 4,
    title: 'Hiking the Tatras',
    startDate: '02-05-2021',
    endDate: '02-05-2021',
    status: 'Past',
  },
]
