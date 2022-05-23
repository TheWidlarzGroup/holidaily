import { fcast } from './manipulation'

export const analyticsEventMap = {
  // General
  APP_LAUNCH: { name: '[GENERAL] App-launch', payload: fcast<never>() },
  LOG_OUT: { name: '[GENERAL] Log-out', payload: fcast<never>() },

  // Dashboard
  DASHBOARD_VIEWED: { name: '[DASHBOARD] Viewed', payload: fcast<never>() },
}

export type AnalyticsEvent = typeof analyticsEventMap
export type AnalyticsEventKeys = keyof AnalyticsEvent
