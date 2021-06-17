import { genMarkedDates } from 'utils/genMarkedDates'

describe('genMarkedDates', () => {
  it('returns empty object when dates undefined', () => {
    const result = genMarkedDates()
    expect(result).toMatchObject({})
  })

  it('properly generates marked dates object', () => {
    const result = genMarkedDates('2021-06-17', '2021-06-19')
    expect(result['2021-06-17']).toMatchObject({ selected: true, startingDay: true })
    expect(result['2021-06-18']).toMatchObject({ selected: true })
    expect(result['2021-06-19']).toMatchObject({ selected: true, endingDay: true })
  })
})
