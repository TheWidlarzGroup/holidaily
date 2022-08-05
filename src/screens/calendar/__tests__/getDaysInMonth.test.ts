import { getDaysInMonth } from '../utils'

describe('getDaysInMonth', () => {
  it('it should return last day of passed month', () => {
    const { maxDay: lastDayFebruary, firstDayNumber, secondDayNumber } = getDaysInMonth(2022, 2)
    const { maxDay: lastDayJune } = getDaysInMonth(2021, 6)
    const { maxDay: lastDayJuly } = getDaysInMonth(2022, 7)

    expect(firstDayNumber).toStrictEqual(2)
    expect(secondDayNumber).toStrictEqual(8)
    expect(lastDayFebruary).toStrictEqual(28)
    expect(lastDayJune).toStrictEqual(30)
    expect(lastDayJuly).toStrictEqual(31)
  })
})
