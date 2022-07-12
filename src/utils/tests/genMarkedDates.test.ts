import { genMarkedDates } from 'utils/genMarkedDates'

describe('genMarkedDates', () => {
  it('returns empty object when dates undefined', () => {
    const result = genMarkedDates()
    expect(result).toMatchObject({})
  })

  it('properly generates marked dates object', () => {
    const result = genMarkedDates('2021-06-17', '2021-06-19')
    expect(result['2021-06-17']).toMatchObject({
      period: true,
      startingDay: true,
      endingDay: false,
      isInvalid: undefined,
      dots: undefined,
    })
    expect(result['2021-06-18']).toMatchObject({
      period: true,
      startingDay: false,
      endingDay: false,
      isInvalid: undefined,
      dots: undefined,
    })
    expect(result['2021-06-19']).toMatchObject({
      period: true,
      startingDay: false,
      endingDay: true,
      isInvalid: undefined,
      dots: undefined,
    })
  })
})
