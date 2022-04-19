import faker from '@faker-js/faker'
import { Factory } from 'miragejs'
import { DayOffRequest } from 'mock-api/models'
import { isDateBetween } from 'utils/dates'
import { getRandomValue } from 'utils/getRandomValue'

const DAY_IN_MS = 24 * 3600 * 1000

const descriptions = [
  'Portugal',
  'Italy',
  'Spain',
  'Greece',
  'France',
  'Croatia',
  'Malta',
  'Cyprus',
  'Rome',
  'Sicily',
  'Sardegna',
  'Corsica',
  'Mallorca',
  'New York',
  'London',
  'Edinburgh',
  'Crete',
  'Barcelona',
  'Time off',
  'Time off',
  'Time off',
  'Time off',
  'Time off',
  'Time off',
  'RHCP concert',
  'Freeride Kaunertal',
  'Hiking the Tatras',
]

export const requestFactory = Factory.extend(genRandomDayOffRequest())

export const genManyRequests = (count: number) => {
  const requests: Omit<DayOffRequest, 'id'>[] = []
  const drawnDayoffInAlreadyScehduledTime = (req: Omit<DayOffRequest, 'id'>) =>
    requests.some(
      (existingReq) =>
        isDateBetween(req.startDate, existingReq.startDate, existingReq.endDate) ||
        isDateBetween(req.endDate, existingReq.startDate, existingReq.endDate)
    )
  for (let i = 0; i < count; i++) {
    let req = genRandomDayOffRequest()

    while (drawnDayoffInAlreadyScehduledTime(req)) {
      req = genRandomDayOffRequest()
    }
    requests.push(req)
  }
  return requests
}

export function genRandomDayOffRequest(): Omit<DayOffRequest, 'id'> {
  let request: Pick<DayOffRequest, 'status' | 'startDate' | 'endDate'>
  const status = genReqStatus()
  const futureDate = faker.date.future()
  const pastDate = faker.date.past()

  switch (status) {
    case 'accepted':
      request = {
        status,
        startDate: genStartDate(futureDate).toISOString(),
        endDate: futureDate.toISOString(),
      }
      break
    case 'pending':
      request = {
        status,
        startDate: genStartDate(futureDate).toISOString(),
        endDate: futureDate.toISOString(),
      }
      break
    case 'cancelled':
      request = {
        status,
        startDate: genStartDate(futureDate).toISOString(),
        endDate: futureDate.toISOString(),
      }
      break
    case 'now':
      request = {
        status: 'accepted',
        startDate: faker.date.recent(7).toISOString(),
        endDate: faker.date.soon(7).toISOString(),
      }
      break
    case 'past':
    default:
      request = {
        status,
        startDate: pastDate.toISOString(),
        endDate: genEndDate(pastDate).toISOString(),
      }
      break
  }
  const isSickTime = !!(randomInt() % 2)
  return {
    ...request,
    message: faker.random.words(15),
    isSickTime,
    description: isSickTime
      ? 'Sick time off'
      : getRandomValue(
          descriptions,
          faker.datatype.number({ min: 0, max: descriptions.length - 1 })
        ),
  }
}

function randomInt(max = 10, min = 0) {
  return Math.ceil(Math.random() * max - min) + min
}

function genReqStatus(): DayOffRequest['status'] | 'now' {
  // 22.22% for accepted/pending/cancelled/past
  // 11.11% for now
  const seed = randomInt() % 9
  if (seed === 0 || seed === 1) return 'accepted'
  if (seed === 2 || seed === 3) return 'pending'
  if (seed === 4 || seed === 5) return 'cancelled'
  if (seed === 6 || seed === 7) return 'past'
  return 'now'
}

function genStartDate(endDate: Date) {
  const date = faker.date.between(
    biggerOfTwo(Date.now() + DAY_IN_MS, endDate.getTime() - 7 * DAY_IN_MS),
    endDate
  )
  // don't start on weekends
  if (date.getDay() === 0 || date.getDate() === 6) date.setTime(date.getTime() - 2 * DAY_IN_MS)
  return date
}

function genEndDate(startDate: Date) {
  const date = faker.date.between(
    startDate,
    smallerOfTwo(Date.now() - DAY_IN_MS, startDate.getTime() + 7 * DAY_IN_MS)
  )
  // don't end on weekend
  if (date.getDay() === 0 || date.getDate() === 6) date.setTime(date.getTime() + 2 * DAY_IN_MS)
  return date
}

function biggerOfTwo(a: number, b: number) {
  if (a - b > 0) return a
  return b
}

function smallerOfTwo(a: number, b: number) {
  if (a - b < 0) return a
  return b
}
