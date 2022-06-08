import { Team } from 'mockApi/models/mirageTypes'
import { DayOffEvent, EVENT_HEIGHT } from 'screens/calendar/components/DayEvent'
import { DAY_ITEM_HEIGHT } from 'screens/calendar/components/DayInfo'
import { getItemLayout } from 'screens/calendar/components/EventsList'
import { getUserTeamId } from 'utils/getUserTeamId'

describe('EventsList getItemLayout', () => {
  const event: DayOffEvent = {
    id: '1',
    person: 'Joe',
    reason: 'Not much',
    position: 'Manager',
    color: 'red',
    categoryId: 1,
    photo: null,
    date: '',
  }

  const teams: Team[] = [
    {
      id: '4',
      name: 'SmartSoft',
      users: [
        {
          id: '32',
          firstName: 'Ben',
          lastName: 'Ten',
          email: '',
          confirmed: true,
          occupation: '',
          teams: [],
          userColor: '#000000',
          language: 'pl',
          photo: null,
          role: '',
          availablePto: 20,
          requests: [],
          isOnHoliday: false,
        },
      ],
    },
  ]

  it('returns index * DAY_ITEM_HEIGHT as offset with no days provided', () => {
    const index = 10
    const expectedOffset = index * DAY_ITEM_HEIGHT

    expect(getItemLayout(null, index)).toHaveProperty('offset', expectedOffset)
  })

  it('returns index * DAY_ITEM_HEIGHT as offset with not events and weekends provided', () => {
    const index = 10
    const days = [{ date: '' }, { date: '' }, { date: '' }]
    const expectedOffset = index * DAY_ITEM_HEIGHT

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

    const totalEventsCount = days.reduce((count, days) => count + days.events.length, 0)

    const expectedOffset = days.length * DAY_ITEM_HEIGHT + totalEventsCount * EVENT_HEIGHT

    const result = getItemLayout(days, days.length)

    expect(result.offset).toBe(expectedOffset)
  })

  it('should return team Id when correct team user is provided', () => {
    const teamId = getUserTeamId('Ben Ten', teams)
    expect(teamId).toBe(4)
  })
})
