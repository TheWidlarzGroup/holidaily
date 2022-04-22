require('react-native-gesture-handler/jestSetup')
// TODO: fix reanimated mock, because the following line is not working since we bumped reanimated version
// require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()
jest.mock('poland-public-holidays', () => ({
  __esModule: true,
  isHoliday: jest.fn(() => false),
  isWorkingDay: jest.fn((date) => ![0, 6].includes(date.getDay())),
}))
