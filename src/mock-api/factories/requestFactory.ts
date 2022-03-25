import { Factory } from 'miragejs'
import { DayOffRequest } from 'mock-api/models'

const DAY_IN_MS = 24 * 3600 * 1000

export const requestFactory = Factory.extend({
  description: `description-${Math.round(Math.random() * 1000)}`,
  message: `message-${Math.round(Math.random() * 1000)}`,
  isSickTime: !!(randomInt() % 2),
  ...genRandomRequest(),
})

function genRandomRequest(): Pick<DayOffRequest, 'status' | 'startDate' | 'endDate'> {
  const statusSeed = randomInt() % 4
  const futureDate = new Date(Date.now() + DAY_IN_MS * dateRangeSeed())
  const pastDate = new Date(Date.now() - DAY_IN_MS * dateRangeSeed() - 1)
  switch (statusSeed) {
    case 0:
      return {
        status: 'accepted',
        startDate: futureDate,
        endDate: new Date(futureDate.getTime() + DAY_IN_MS * dateRangeSeed()),
      }
    case 1:
      return {
        status: 'pending',
        startDate: futureDate,
        endDate: new Date(futureDate.getTime() + DAY_IN_MS * dateRangeSeed()),
      }
    case 2:
      return {
        status: 'cancelled',
        startDate: futureDate,
        endDate: new Date(futureDate.getTime() + DAY_IN_MS * dateRangeSeed()),
      }
    case 3:
    default:
      return {
        status: 'past',
        startDate: pastDate,
        endDate: new Date(pastDate.getTime() + DAY_IN_MS * dateRangeSeed()),
      }
  }
}

function randomInt(max = 10, min = 0) {
  return Math.round(Math.random() * max) + min
}
function dateRangeSeed() {
  return randomInt() % 7
}
