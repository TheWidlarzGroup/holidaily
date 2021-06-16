import { splitName } from 'utils/splitName'

test('splits nameSurname string into array of two strings', () => {
  const expected = ['John', 'Smith']
  expect(splitName('John Smith')).toEqual(expected)
})
