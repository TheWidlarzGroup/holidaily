import { randomFromRange } from 'utils/randomFromRange'

test('returns random value from the range of numbers provided', () => {
  const min = 10
  const max = 100
  expect(randomFromRange(min, max)).toBeLessThanOrEqual(max)
  expect(randomFromRange(min, max)).toBeGreaterThanOrEqual(min)
})
