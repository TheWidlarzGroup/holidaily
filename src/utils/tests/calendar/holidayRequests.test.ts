import { HolidayRequestMonthType } from 'types/HolidayRequestMonthType'
import { getFirstRequestsOfMonth } from 'utils/dayOffUtils'
import { getNextMonthRequests } from 'utils/getNextMonthRequests'

describe('Get holiday requests of next month', () => {
  const requests: HolidayRequestMonthType[] = [
    {
      date: '2022-08',
      days: [
        {
          date: '2022-08-03',
          events: [
            {
              categoryId: 3,
              color: '#BE8FF2',
              date: '2022-08-03',
              id: 'Zuq7mkbPnfUzTfPLFewDZZZEoTXnxI6d',
              monthYear: '2022-08',
              firstName: 'Brent',
              lastName: 'Morris',
              photo: 'https://randomuser.me/api/portraits/men/11.jpg',
              position: 'QA Tester',
              reason: 'Edinburgh',
            },
          ],
        },
      ],
    },
    {
      date: '2022-09',
      days: [
        {
          date: '2022-09-02',
          events: [
            {
              categoryId: 1,
              color: '#FD8989',
              date: '2021-09-02',
              id: 'kP0rU5jPMCqwUg8V49Xwj7t04jmiwIoc',
              monthYear: '2022-09',
              firstName: 'Peter',
              lastName: 'Kansas',
              photo: 'https://randomuser.me/api/portraits/men/1.jpg',
              position: 'Software Engineer',
              reason: 'Sick time off',
            },
          ],
        },
        {
          date: '2022-09-10',
          events: [
            {
              categoryId: 1,
              color: '#FD8989',
              date: '2021-09-10',
              id: 'kP0rU5jPMCqwUg8V49Xwj7t04jmiwIoc',
              monthYear: '2022-09',
              firstName: 'Ben',
              lastName: 'Ten',
              photo: 'https://randomuser.me/api/portraits/men/1.jpg',
              position: 'Software Engineer',
              reason: 'Sick time off',
            },
          ],
        },
      ],
    },
  ]
  const currentDate = new Date('2022-08-01')

  it('returns requests of next month', () => {
    const nextMonthRequests = getNextMonthRequests(requests, currentDate)
    expect(nextMonthRequests).toBe(requests[1])
  })

  it('returns first four days of month if it exists', () => {
    const firstRequestsOfMonth = getFirstRequestsOfMonth(requests[1])
    expect(firstRequestsOfMonth.length).toBe(1)
  })
})
