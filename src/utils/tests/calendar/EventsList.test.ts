import { DayOffEvent } from 'screens/calendar/components/DayEvent'
import { getItemLayout } from 'screens/calendar/components/EventsList'

describe('EventsList getItemLayout', () => {
  const ITEM_HEIGHT = 49.9 + 16
  const WEEKEND_HEIGHT = 50.5 + 5
  const EVENT_HEIGHT = 46

  const event: DayOffEvent = {
    id: 1,
    person: 'Joe',
    reason: 'Not much',
    position: 'Manager',
    color: 'red',
    categoryId: 1,
  }

  it('returns index * ITEM_HEIGHT as offset with no days provided', () => {
    const index = 10
    const expectedOffset = index * ITEM_HEIGHT

    expect(getItemLayout(null, index)).toHaveProperty('offset', expectedOffset)
  })

  it('returns index * ITEM_HEIGHT as offset with not events and weekends provided', () => {
    const index = 10
    const days = [{ date: '' }, { date: '' }, { date: '' }]
    const expectedOffset = index * ITEM_HEIGHT

    expect(getItemLayout(days, index)).toHaveProperty('offset', expectedOffset)
  })

  it('returns different offset for different indices when same data is provided', () => {
    const days = [
      { date: '', events: new Array(1).fill(event), weekend: 1 },
      { date: '', events: new Array(5).fill(event), weekend: 0 },
      { date: '', events: new Array(10).fill(event), weekend: 5 },
    ]
    const shorterIndex = 1
    const totalIndex = days.length
    const longerIndex = 10

    const shorterResult = getItemLayout(days, shorterIndex)
    const totalResult = getItemLayout(days, totalIndex)
    const longerResult = getItemLayout(days, longerIndex)

    expect(new Set([shorterResult, totalResult, longerResult]).size).toBe(3)
  })

  it('returns proper offset for specified data', () => {
    const days = [
      { date: '', events: new Array(1).fill(event), weekend: 1 },
      { date: '', events: new Array(5).fill(event), weekend: 0 },
      { date: '', events: new Array(10).fill(event), weekend: 5 },
    ]

    // 16
    const totalEventsCount = days.reduce((count, days) => count + days.events.length, 0)
    // 2
    const totalWeekendsCount = days.reduce((count, days) => count + (days.weekend ? 1 : 0), 0)

    const expectedOffset =
      days.length * ITEM_HEIGHT +
      totalEventsCount * EVENT_HEIGHT -
      totalWeekendsCount * ITEM_HEIGHT +
      totalWeekendsCount * WEEKEND_HEIGHT

    const result = getItemLayout(days, days.length)

    expect(result.offset).toBe(expectedOffset)
  })
})
