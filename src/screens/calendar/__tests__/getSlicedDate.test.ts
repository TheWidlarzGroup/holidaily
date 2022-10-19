import { getSlicedDate } from '../utils'

describe('getSlicedDate', () => {
  it('it should return separate parts of date', () => {
    const date = '2022-07-22'

    const { year, month, day } = getSlicedDate(date)

    expect(year).toMatch('2022')
    expect(month).toMatch('07')
    expect(day).toMatch('22')
  })
})
