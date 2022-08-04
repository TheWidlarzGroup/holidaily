import 'react-native'
import 'react-native-gesture-handler/jestSetup'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

global.__reanimatedWorkletInit = jest.fn()

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()

jest.mock('poland-public-holidays', () => ({
  __esModule: true,
  isHoliday: jest.fn(() => false),
  isWorkingDay: jest.fn((date) => ![0, 6].includes(date.getDay())),
}))

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('@shopify/restyle', () => {
  const RealModule = jest.requireActual('@shopify/restyle')
  const RN = jest.requireActual('react-native')
  RealModule.createText = () => RN.Text
  RealModule.createBox = () => RN.View
  RealModule.createRestyleComponent = (f, c) => c || RN.View
  return RealModule
})
