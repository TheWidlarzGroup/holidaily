import { noEmojiRegex } from 'utils/regex'

it('Should match string without emojis', () => {
  expect(noEmojiRegex.test('😀')).toBe(false)
  expect(noEmojiRegex.test('I have 👀 it up')).toBe(false)
  expect(noEmojiRegex.test('🧛‍♀️ 🧛 🧛‍♂️ ')).toBe(false)
  expect(noEmojiRegex.test('I hate emojis')).toBe(true)
})
