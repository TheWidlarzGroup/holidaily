import * as NewRelic from '@bibabovn/react-native-newrelic'
import { Amplitude, Identify } from '@amplitude/react-native'
<<<<<<< HEAD
=======
import { generateUUID } from 'utils/generateUUID'
import { getItem, removeItem, setItem } from 'utils/localStorage'
>>>>>>> master
import { AMPLITUDE_API_KEY } from '@env'
import { User } from '../mock-api/models'
import { makePrefixKeys, parseObjectToNewRelicSimpleType } from '../utils/analyticsUtils'
import { AnalyticsEvent, AnalyticsEventKeys, analyticsEventMap } from '../utils/eventMap'
import { entries } from '../utils/manipulation'

export type UserAnalyticsAttributes = Pick<User, 'firstName' | 'id' | 'role'>
let analyticsService: AnalyticsService | null = null

export const initAnalytics = () => {
  let ampInstance: Amplitude

  const initializeAnalytics = () => {
    ampInstance = Amplitude.getInstance()
    ampInstance.init(AMPLITUDE_API_KEY)
    NewRelic.enableAutoRecordJSUncaughtException()
  }
  initializeAnalytics()

  return {
<<<<<<< HEAD
    setUserId: (id: string) => {
      ampInstance.setUserId(id)
      NewRelic.setUserId(id)
=======
    setUserId: async () => {
      const userId = generateUUID()
      const cachedUserId = await getItem('userId')
      if (!cachedUserId) {
        setItem('userId', userId)
      }
      ampInstance.setUserId(cachedUserId || userId)
      Analytics().identify({ id: cachedUserId || userId })
>>>>>>> master
    },
    identify: (opts: Partial<UserAnalyticsAttributes>) => {
      const identify = new Identify()
      for (const [key, val] of entries(opts)) {
        if (!val) return
        identify.set(key, val)
        ampInstance.identify(identify)
        NewRelic.setAttribute(key, val)
      }
    },
    setCurrentScreen: (currentScreenName: string) => {
      ampInstance.logEvent(`[${currentScreenName}] Viewed`)
      NewRelic.recordCustomEvent('Custom', `[${currentScreenName}] Viewed`)
    },
    track: <K extends AnalyticsEventKeys>(event: K, properties?: AnalyticsEvent[K]['payload']) => {
      ampInstance.logEvent(analyticsEventMap[event].name, properties ?? {})
      NewRelic.recordCustomEvent(
        'Custom',
        analyticsEventMap[event].name,
        parseObjectToNewRelicSimpleType(makePrefixKeys(properties ?? {}))
      )
    },
  }
}

export const Analytics = () => {
  if (!analyticsService) analyticsService = initAnalytics()
  return analyticsService
}

export type AnalyticsService = ReturnType<typeof initAnalytics>
