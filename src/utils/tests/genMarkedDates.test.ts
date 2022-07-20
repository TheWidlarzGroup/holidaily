import { genMarkedDates } from 'utils/genMarkedDates'

const dayObj = {
  period: true,
  startingDay: true,
  endingDay: false,
  isInvalid: undefined,
  dots: undefined,
}

describe('genMarkedDates', () => {
  it('returns empty object when dates undefined', () => {
    const result = genMarkedDates()
    expect(result).toMatchObject({})
  })

  it('properly generates marked dates object', () => {
    const result = genMarkedDates('2021-06-17', '2021-06-19')
    expect(result['2021-06-17']).toMatchObject(dayObj)
    expect(result['2021-06-18']).toMatchObject({ ...dayObj, startingDay: false })
    expect(result['2021-06-19']).toMatchObject({ ...dayObj, endingDay: true, startingDay: false })
  })
})
