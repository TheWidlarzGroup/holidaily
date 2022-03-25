import { generateUUID } from 'utils/generateUUID'
import { TeamUserRequest } from './Team'

export const teamUserRequests: TeamUserRequest[] = [
  {
    id: generateUUID(),
    status: 'PENDING',
    startDate: '06/05/2020',
    endDate: '10/05/2000',
    count: 11,
    createdAt: '01/05/2000',
  },
]
