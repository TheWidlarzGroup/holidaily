import * as NewRelic from '@bibabovn/react-native-newrelic'
import { generateUUID } from 'utils/generateUUID'
import { getItem, removeItem, setItem } from 'utils/localStorage'
import { User } from '../mock-api/models'
import { makePrefixKeys, parseObjectToNewRelicSimpleType } from '../utils/analyticsUtils'
import { AnalyticsEvent, AnalyticsEventKeys, analyticsEventMap } from '../utils/eventMap'
import { entries } from '../utils/manipulation'

export type UserAnalyticsAttributes = Pick<User, 'firstName' | 'id' | 'role'>
let analyticsService: AnalyticsService | null = null

export const initAnalytics = () => {
  const initializeAnalytics = () => {
    NewRelic.enableAutoRecordJSUncaughtException()
  }
  initializeAnalytics()

  return {
    setUserId: async () => {
      const userId = generateUUID()
      const cachedUserId = await getItem('userId')
      if (!cachedUserId) {
        setItem('userId', userId)
      }
      Analytics().identify({ id: cachedUserId || userId })
    },
    identify: (opts: Partial<UserAnalyticsAttributes>) => {
      for (const [key, val] of entries(opts)) {
        if (!val) return
        NewRelic.setAttribute(key, val)
      }
    },
    setCurrentScreen: (currentScreenName: string) => {
      NewRelic.recordCustomEvent('Custom', `[${currentScreenName}] Viewed`)
    },
    track: <K extends AnalyticsEventKeys>(event: K, properties?: AnalyticsEvent[K]['payload']) => {
      NewRelic.recordCustomEvent(
        'Custom',
        analyticsEventMap[event].name,
        parseObjectToNewRelicSimpleType(makePrefixKeys(properties ?? {}))
      )
    },
    reset: () => {
      removeItem('userId')
    },
  }
}

export const Analytics = () => {
  if (!analyticsService) analyticsService = initAnalytics()
  return analyticsService
}

export type AnalyticsService = ReturnType<typeof initAnalytics>
