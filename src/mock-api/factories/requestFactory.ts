import faker from '@faker-js/faker'
import { Factory } from 'miragejs'
import { DayOffRequest } from 'mock-api/models'

const DAY_IN_MS = 24 * 3600 * 1000

export const requestFactory = Factory.extend(genRandomDayOffRequest())

export function genRandomDayOffRequest(): Partial<DayOffRequest> {
  let request: Partial<DayOffRequest>
  const statusSeed = randomInt() % 4
  const futureDate = faker.date.future()
  const pastDate = faker.date.past()

  switch (statusSeed) {
    case 0:
      request = {
        status: 'accepted',
        startDate: genStartDate(futureDate).toISOString(),
        endDate: futureDate.toISOString(),
      }
      break
    case 1:
      request = {
        status: 'pending',
        startDate: genStartDate(futureDate).toISOString(),
        endDate: futureDate.toISOString(),
      }
      break
    case 2:
      request = {
        status: 'cancelled',
        startDate: genStartDate(futureDate).toISOString(),
        endDate: futureDate.toISOString(),
      }
      break
    case 3:
    default:
      request = {
        status: 'past',
        startDate: pastDate.toISOString(),
        endDate: genEndDate(pastDate).toISOString(),
      }
      break
  }
  request.description = faker.random.words(3)
  request.message = faker.random.words(15)
  request.isSickTime = !!(randomInt() % 2)
  return request
}

function randomInt(max = 10, min = 0) {
  return Math.round(Math.random() * max - 1) + min
}

function genStartDate(endDate: Date) {
  const date = faker.date.between(
    biggerOfTwo(Date.now(), endDate.getTime() - 7 * DAY_IN_MS),
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
