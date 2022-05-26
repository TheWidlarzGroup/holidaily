import { fcast } from './manipulation'

export const analyticsEventMap = {
  // General
  APP_LAUNCH: { name: '[GENERAL] App-launch', payload: fcast<never>() },
  LOG_OUT: { name: '[GENERAL] Log-out', payload: fcast<never>() },

  // Dashboard
  DASHBOARD_TEAM_OPENED: {
    name: '[DASHBOARD] Team Modal Opened',
    payload: fcast<{ teamName: string }>(),
  },
  DASHBOARD_TEAM_MATE_OPENED: {
    name: '[DASHBOARD] Team Mate Modal Opened',
    payload: fcast<{ teamMateName: string }>(),
  },
  DASHBOARD_CAROUSEL_OPENED: {
    name: '[DASHBOARD] Carousel Modal Opened',
    payload: fcast<{ profileName: string }>(),
  },

  // Holifeed
  CREATE_POST: { name: '[HOLIFEED] Post Created', payload: fcast<{ content: string }>() },

  // Add Request
  // REQUEST_VACATION: { name: '[REQUEST_VACATION] Opened', payload: fcast<never>() },

  // Edit Profile
  // COLOR_PICKER_VIEWED: { name: '[EDIT_PROFILE] COLOR_PICKER Opened', payload: fcast<never>() },
  // SUBSCRIBE_NEW_TEAM_VIEWED: {
  //   name: '[EDIT_PROFILE] SUBSCRIBE_NEW_TEAM Opened',
  //   payload: fcast<never>(),
  // },
}

export type AnalyticsEvent = typeof analyticsEventMap
export type AnalyticsEventKeys = keyof AnalyticsEvent
