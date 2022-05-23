import * as NewRelic from '@bibabovn/react-native-newrelic'
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
    // setUserId: () => {
    // AsyncStroage + call to NR
    // },

    identify: (opts: Partial<UserAnalyticsAttributes>) => {
      for (const [key, val] of entries(opts)) {
        if (!val) return
        NewRelic.setAttribute(key, val)
      }
    },
    track: <K extends AnalyticsEventKeys>(event: K, properties?: AnalyticsEvent[K]['payload']) => {
      NewRelic.recordCustomEvent(
        'Custom',
        analyticsEventMap[event].name,
        parseObjectToNewRelicSimpleType(makePrefixKeys(properties ?? {}))
      )
    },

    // TODO: check if a user can log out, if so we need to clear the session
    // reset: () => {
    //   analytics.reset()
    // },
  }
}

export const Analytics = () => {
  if (!analyticsService) analyticsService = initAnalytics()
  return analyticsService
}

export type AnalyticsService = ReturnType<typeof initAnalytics>
