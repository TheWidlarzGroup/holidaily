import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import { Factory } from 'miragejs'
import { DayOffRequest } from 'mock-api/models'

const DAY_IN_MS = 24 * 3600 * 1000

export const requestFactory = Factory.extend(genRandomDayOffRequest())

export function genRandomDayOffRequest(): Partial<DayOffRequest> {
  let request: Partial<DayOffRequest>
  const statusSeed = randomInt() % 4
  const futureDate = new Date(Date.now() + DAY_IN_MS * dateRangeSeed())
  const pastDate = new Date(Date.now() - DAY_IN_MS * dateRangeSeed() - 1)

  switch (statusSeed) {
    case 0:
      request = {
        status: 'accepted',
        startDate: futureDate.toISOString(),
        endDate: new Date(futureDate.getTime() + DAY_IN_MS * dateRangeSeed()).toISOString(),
      }
      break
    case 1:
      request = {
        status: 'pending',
        startDate: futureDate.toISOString(),
        endDate: new Date(futureDate.getTime() + DAY_IN_MS * dateRangeSeed()).toISOString(),
      }
      break
    case 2:
      request = {
        status: 'cancelled',
        startDate: futureDate.toISOString(),
        endDate: new Date(futureDate.getTime() + DAY_IN_MS * dateRangeSeed()).toISOString(),
      }
      break
    case 3:
    default:
      request = {
        status: 'past',
        startDate: pastDate.toISOString(),
        endDate: new Date(pastDate.getTime() + DAY_IN_MS * dateRangeSeed()).toISOString(),
      }
      break
  }
  request.description = `description-${Math.round(Math.random() * 1000)}`
  request.message = `message-${Math.round(Math.random() * 1000)}`
  request.isSickTime = !!(randomInt() % 2)
  return request
}

function randomInt(max = 10, min = 0) {
  return Math.round(Math.random() * max) + min
}
function dateRangeSeed() {
  return randomInt() % 7
}
