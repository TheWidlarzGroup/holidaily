import { setUpTests } from 'react-native-reanimated/lib/src/reanimated2/jestUtils'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
require('react-native-gesture-handler/jestSetup')
// TODO: fix reanimated mock, because the following line is not working since we bumped reanimated version
// require('react-native-reanimated/lib/src/reanimated2/jestUtils').setUpTests()
setUpTests()
setUpTests()

jest.mock('poland-public-holidays', () => ({
  __esModule: true,
  isHoliday: jest.fn(() => false),
  isWorkingDay: jest.fn((date) => ![0, 6].includes(date.getDay())),
}))
