import faker from '@faker-js/faker'
import { Factory } from 'miragejs'
import { DayOffRequest } from 'mock-api/models'
import { isHoliday } from 'poland-public-holidays'
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
  const { futureDate, pastDate, recentDate, soonDate } = drawDates()

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
        startDate: recentDate.toISOString(),
        endDate: soonDate.toISOString(),
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

function drawDates() {
  let futureDate = faker.date.future()
  let pastDate = faker.date.past()
  const recentDate = faker.date.recent(7)
  const soonDate = faker.date.soon(7)
  // draw only working days
  while (!isWorkingDay(futureDate)) {
    futureDate = faker.date.future()
  }
  while (!isWorkingDay(pastDate)) {
    pastDate = faker.date.future()
  }
  while (!isWorkingDay(recentDate)) {
    recentDate.setTime(recentDate.getTime() + DAY_IN_MS)
  }
  while (!isWorkingDay(soonDate)) {
    soonDate.setTime(soonDate.getTime() - DAY_IN_MS)
  }
  return { futureDate, pastDate, recentDate, soonDate }
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
  // don't start on weekends/holidays
  while (!isWorkingDay(date)) {
    date.setTime(date.getTime() + DAY_IN_MS)
  }
  return date
}

function genEndDate(startDate: Date) {
  const date = faker.date.between(
    startDate,
    smallerOfTwo(Date.now() - DAY_IN_MS, startDate.getTime() + 7 * DAY_IN_MS)
  )
  // don't end on weekend/holidays
  while (!isWorkingDay(date)) {
    date.setTime(date.getTime() - DAY_IN_MS)
  }
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

function isWorkingDay(date: Date) {
  const weekDay = date.getDay()
  if (weekDay === 0 || weekDay === 6) return true
  return isHoliday(date)
}
