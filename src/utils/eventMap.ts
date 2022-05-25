import { fcast } from './manipulation'

export const analyticsEventMap = {
  // General
  APP_LAUNCH: { name: '[GENERAL] App-launch', payload: fcast<never>() },
  LOG_OUT: { name: '[GENERAL] Log-out', payload: fcast<never>() },

  // Slider
  SLIDER_VIEWED: { name: '[SLIDER] Viewed', payload: fcast<never>() },

  // Welcome
  WELCOME_VIEWED: { name: '[WELCOME] Viewed', payload: fcast<never>() },

  // Dashboard
  DASHBOARD_VIEWED: { name: '[DASHBOARD] Viewed', payload: fcast<never>() },
  DASHBOARD_TEAM_VIEWED: { name: '[DASHBOARD_TEAM] Viewed', payload: fcast<never>() },

  // Calendar
  CALENDAR_VIEWED: { name: '[CALENDAR] Viewed', payload: fcast<never>() },

  // Holifeed
  FEED_VIEWED: { name: '[HOLIFEED] Viewed', payload: fcast<never>() },
  CREATE_POST_VIEWED: { name: '[CREATE_POST] Viewed', payload: fcast<never>() },

  // Add Request
  REQUEST_VACATION_VIEWED: { name: '[REQUEST_VACATION] Viewed', payload: fcast<never>() },

  // Stats and Requests
  STATS_AND_REQUESTS_VIEWED: { name: '[STATS_AND_REQUESTS] Viewed', payload: fcast<never>() },
  SEE_REQUEST_VIEWED: { name: '[SEE_REQUEST] Viewed', payload: fcast<never>() },
  REQUEST_VACATION_CALENDAR_VIEWED: {
    name: '[REQUEST_VACATION_CALENDAR_CALENDAR] Viewed',
    payload: fcast<never>(),
  },

  // Notifications
  NOTIFICATIONS_VIEWED: { name: '[NOTIFICATIONS] Viewed', payload: fcast<never>() },

  // About
  ABOUT_VIEWED: { name: '[ABOUT] Viewed', payload: fcast<never>() },

  // Settings
  SETTINGS_VIEWED: { name: '[SETTINGS] Viewed', payload: fcast<never>() },

  // Budget
  BUDGET_VIEWED: { name: '[BUDGET] Viewed', payload: fcast<never>() },
  PTO_POLICY_VIEWED: { name: '[PTO_POLICY] Viewed', payload: fcast<never>() },

  // Edit Profile
  EDIT_PROFILE_VIEWED: { name: '[EDIT_PROFILE] Viewed', payload: fcast<never>() },
  COLOR_PICKER_VIEWED: { name: '[COLOR_PICKER] Viewed', payload: fcast<never>() },
  SUBSCRIBE_NEW_TEAM_VIEWED: { name: '[SUBSCRIBE_NEW_TEAM] Viewed', payload: fcast<never>() },
}

export type AnalyticsEvent = typeof analyticsEventMap
export type AnalyticsEventKeys = keyof AnalyticsEvent
