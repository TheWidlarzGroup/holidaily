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
  DASHBOARD_FIRST_TEAM_VIEWED: {
    name: '[DASHBOARD] Join First Team Viewed',
    payload: fcast<{ profileName: string }>(),
  },

  // Holifeed
  CREATE_POST: {
    name: '[HOLIFEED] Post Created',
    payload: fcast<{ content: string; imagesCount: number; location: string }>(),
  },
  FEED_ADD_EMOJI: {
    name: '[HOLIFEED] Emoji Added',
    payload: fcast<{ emoji: string; postId?: string }>(),
  },
  FEED_COMMENT_CREATED: {
    name: '[HOLIFEED] Comment Created',
    payload: fcast<{ postId?: string; content: string }>(),
  },

  // Add Request
  // REQUEST_VACATION: { name: '[REQUEST_VACATION] Opened', payload: fcast<never>() },

  // Edit Profile
  USER_COLOR_PICKED: {
    name: '[EDIT_PROFILE] User Color Picked',
    payload: fcast<{ color: string }>(),
  },
  TEAM_UNSUBSCRIBED: {
    name: '[EDIT_PROFILE] Team Unsubscribed',
    payload: fcast<{ teamName: string }>(),
  },
  TEAM_SUBSCRIBED: {
    name: '[EDIT_PROFILE] New Team Subscribed',
    payload: fcast<{ teamName: string }>(),
  },

  // Settings
  LANGUAGE_CHANGED: {
    name: '[SETTINGS] Language Changed',
    payload: fcast<{ language: string }>(),
  },
  THEME_CHANGED: {
    name: '[SETTINGS] Theme Changed',
    payload: fcast<{ darkMode: boolean }>(),
  },

  // About
  RATE_APP_PRESSED: {
    name: '[ABOUT] Rate App Pressed',
    payload: fcast<never>(),
  },
}

export type AnalyticsEvent = typeof analyticsEventMap
export type AnalyticsEventKeys = keyof AnalyticsEvent
