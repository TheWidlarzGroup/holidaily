import { Amplitude, Identify } from '@amplitude/react-native'
import { AMPLITUDE_API_KEY } from '@env'
import Smartlook from 'smartlook-react-native-wrapper'
import { User } from '../mock-api/models'
import { AnalyticsEvent, AnalyticsEventKeys, analyticsEventMap } from '../utils/eventMap'
import { entries } from '../utils/manipulation'

export type UserAnalyticsAttributes = Pick<User, 'firstName' | 'id' | 'role'>
let analyticsService: AnalyticsService | null = null

export const initAnalytics = () => {
  let ampInstance: Amplitude

  const initializeAnalytics = () => {
    ampInstance = Amplitude.getInstance()
    ampInstance.init(AMPLITUDE_API_KEY)
  }
  initializeAnalytics()

  return {
    setUserId: (id: string) => {
      ampInstance.setUserId(id)
      Smartlook.setUserIdentifier(id)
    },
    identify: (opts: Partial<UserAnalyticsAttributes>) => {
      const identify = new Identify()
      if (opts.id) Smartlook.setUserIdentifier(opts.id, opts)
      for (const [key, val] of entries(opts)) {
        if (!val) return
        identify.set(key, val)
        ampInstance.identify(identify)
      }
    },
    setCurrentScreen: (currentScreenName: string) => {
      ampInstance.logEvent(`[${currentScreenName}] Viewed`)
    },
    track: <K extends AnalyticsEventKeys>(event: K, properties?: AnalyticsEvent[K]['payload']) => {
      ampInstance.logEvent(analyticsEventMap[event].name, properties ?? {})
    },
  }
}

export const Analytics = () => {
  if (!analyticsService) analyticsService = initAnalytics()
  return analyticsService
}

export type AnalyticsService = ReturnType<typeof initAnalytics>
