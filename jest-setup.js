import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
require('react-native-gesture-handler/jestSetup')

require('react-native-reanimated/lib/src/reanimated2/jestUtils').setUpTests()

jest.mock('poland-public-holidays', () => ({
  __esModule: true,
  isHoliday: jest.fn(() => false),
  isWorkingDay: jest.fn((date) => ![0, 6].includes(date.getDay())),
}))
