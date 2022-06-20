import { CompoundLocation } from 'hooks/useLocation'
import { DayOffRequest } from 'mockApi/models'
import { fcast } from './manipulation'

type AddRequestPayload = {
  isSick: boolean
  filesCount: number
  photosCount: number
  message?: string
  endDate?: string
  startDate?: string
  createdAt?: string
  description?: string
}

type Request = Omit<DayOffRequest, 'id' | 'user' | 'isOnHoliday'>

export type AnalyticsScreens = 'FEED' | 'USER' | 'REQUEST'

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
  DASHBOARD_TEAM_LONG_PRESSED: {
    name: '[DASHBOARD] Team Long Pressed',
    payload: fcast<{ element: number | null }>(),
  },
  DASHBOARD_TEAM_DRAGGED: {
    name: '[DASHBOARD] Team Dragged',
    payload: fcast<{ element: number | null; newPosition: number | null }>(),
  },
  DASHBOARD_CAROUSEL_OPENED: {
    name: '[DASHBOARD] Carousel Modal Opened',
    payload: fcast<{ profileName: string }>(),
  },
  DASHBOARD_FIRST_TEAM_VIEWED: {
    name: '[DASHBOARD] Join First Team Viewed',
    payload: fcast<never>(),
  },

  // Calendar
  CALENDAR_SCROLL_TO_BUTTON_PRESSED: {
    name: '[CALENDAR] Scroll To Button Pressed',
    payload: fcast<never>(),
  },

  // Holifeed
  CREATE_POST: {
    name: '[HOLIFEED] Post Created',
    payload: fcast<{ content: string; imagesCount: number; location: string }>(),
  },
  CREATE_POST_CAMERA_PRESSED: {
    name: '[HOLIFEED] Create Post Camera Pressed',
    payload: fcast<never>(),
  },
  CREATE_POST_CAMERA_LONG_PRESSED: {
    name: '[HOLIFEED] Create Post Camera Long Pressed',
    payload: fcast<never>(),
  },
  CREATE_POST_GALLERY_PRESSED: {
    name: '[HOLIFEED] Create Post Gallery Pressed',
    payload: fcast<never>(),
  },
  CREATE_POST_LOCATION_PRESSED: {
    name: '[HOLIFEED] Create Post Location Pressed',
    payload: fcast<never>(),
  },
  POST_SLIDE_CHANGED: {
    name: '[HOLIFEED] Post Slide Changed',
    payload: fcast<{ postId?: string; slideNumber: number }>(),
  },
  FEED_ADD_EMOJI: {
    name: '[HOLIFEED] Emoji Added',
    payload: fcast<{ emoji: string; postId?: string }>(),
  },
  FEED_EMOJI_PICKER_OPENED: {
    name: '[HOLIFEED] Emoji Picker Opened',
    payload: fcast<{ postId?: string }>(),
  },
  FEED_LOCATION_ADDED: {
    name: '[HOLIFEED] Location Added',
    payload: fcast<{ location: CompoundLocation }>(),
  },
  FEED_COMMENT_CREATED: {
    name: '[HOLIFEED] Comment Created',
    payload: fcast<{ postId?: string; content: string }>(),
  },
  FEED_COMMENTS_EXPANDED: {
    name: '[HOLIFEED] Comments Expanded',
    payload: fcast<{ postId: string }>(),
  },
  FEED_ADD_ATTACHMENT_MODAL_OPENED: {
    name: '[HOLIFEED] Add Attachment Modal Opened',
    payload: fcast<never>(),
  },
  FEED_ADD_ATTACHMENT_IMAGE_ADDED: {
    name: '[HOLIFEED] Add Attachment Image Added',
    payload: fcast<{ uri: string; type?: string }>(),
  },
  FEED_ADD_ATTACHMENT_PHOTO_ADDED: {
    name: '[HOLIFEED] Add Attachment Photo Added',
    payload: fcast<{ type?: string }>(),
  },
  FEED_ADD_ATTACHMENT_MODAL_CANCELLED: {
    name: '[HOLIFEED] Add Attachment Modal Cancelled',
    payload: fcast<never>(),
  },
  FEED_ADD_ATTACHMENT_MODAL_GALLERY_PICKED: {
    name: '[HOLIFEED] Add Attachment Modal Gallery Picked',
    payload: fcast<never>(),
  },
  FEED_ADD_ATTACHMENT_MODAL_CAMERA_PICKED: {
    name: '[HOLIFEED] Add Attachment Modal Camera Picked',
    payload: fcast<never>(),
  },
  FEED_ADD_ATTACHMENT_MODAL_FILE_PICKED: {
    name: '[HOLIFEED] Add Attachment Modal File Picked',
    payload: fcast<never>(),
  },
  FEED_LOCATION_LIST_MODAL_OPENED: {
    name: '[HOLIFEED] Location List Modal Opened',
    payload: fcast<never>(),
  },
  FEED_MESSAGE_INPUT_MODAL_OPENED: {
    name: '[HOLIFEED] Message Input Modal Opened',
    payload: fcast<{ postId?: string }>(),
  },

  // Add Request
  REQUEST_VACATION_ADD: {
    name: '[REQUEST_VACATION] Request Vacation Added',
    payload: fcast<AddRequestPayload>(),
  },
  REQUEST_SICK_TIME_PRESSED: {
    name: '[REQUEST_VACATION] Sick Time Pressed',
    payload: fcast<never>(),
  },
  REQUEST_START_DATE_CHANGED: {
    name: '[REQUEST_VACATION] Start Date Changed',
    payload: fcast<{ startDate: string }>(),
  },
  REQUEST_END_DATE_CHANGED: {
    name: '[REQUEST_VACATION] End Date Changed',
    payload: fcast<{ endDate: string }>(),
  },
  REQUEST_STEP_CHANGED: {
    name: '[REQUEST_VACATION] Step Changed',
    payload: fcast<{ step: number }>(),
  },
  REQUEST_ADD_ATTACHMENT_MODAL_OPENED: {
    name: '[REQUEST_VACATION] Add Attachment Modal Opened',
    payload: fcast<never>(),
  },
  REQUEST_ADD_ATTACHMENT_IMAGE_ADDED: {
    name: '[REQUEST_VACATION] Add Attachment Image Added',
    payload: fcast<{ uri: string; type?: string }>(),
  },
  REQUEST_ADD_ATTACHMENT_PHOTO_ADDED: {
    name: '[REQUEST_VACATION] Add Attachment Image Added',
    payload: fcast<{ type?: string }>(),
  },
  REQUEST_ADD_ATTACHMENT_MODAL_CANCELLED: {
    name: '[REQUEST_VACATION] Add Attachment Modal Cancelled',
    payload: fcast<never>(),
  },
  REQUEST_ADD_ATTACHMENT_MODAL_GALLERY_PICKED: {
    name: '[REQUEST_VACATION] Add Attachment Modal Gallery Picked',
    payload: fcast<never>(),
  },
  REQUEST_ADD_ATTACHMENT_MODAL_CAMERA_PICKED: {
    name: '[REQUEST_VACATION] Add Attachment Modal Camera Picked',
    payload: fcast<never>(),
  },
  REQUEST_ADD_ATTACHMENT_MODAL_FILE_PICKED: {
    name: '[REQUEST_VACATION] Add Attachment Modal Camera Picked',
    payload: fcast<never>(),
  },

  // Stats and Requests
  REQUEST_OPENED: {
    name: '[STATS_AND_REQUESTS] Request Opened',
    payload: fcast<{ request: Request }>(),
  },

  // Edit Profile
  USER_COLOR_PICKED: {
    name: '[EDIT_PROFILE] User Color Picked',
    payload: fcast<{ color: string }>(),
  },
  USER_ADD_ATTACHMENT_MODAL_OPENED: {
    name: '[EDIT_PROFILE] Add Attachment Modal Opened',
    payload: fcast<never>(),
  },
  USER_ADD_ATTACHMENT_IMAGE_ADDED: {
    name: '[EDIT_PROFILE] Add Attachment Image Added',
    payload: fcast<{ uri: string; type?: string }>(),
  },
  USER_ADD_ATTACHMENT_PHOTO_ADDED: {
    name: '[EDIT_PROFILE] Add Attachment Photo Added',
    payload: fcast<{ type?: string }>(),
  },
  USER_ADD_ATTACHMENT_MODAL_CANCELLED: {
    name: '[EDIT_PROFILE] Add Attachment Modal Cancelled',
    payload: fcast<never>(),
  },
  USER_ADD_ATTACHMENT_MODAL_GALLERY_PICKED: {
    name: '[EDIT_PROFILE] Add Attachment Modal Gallery Picked',
    payload: fcast<never>(),
  },
  USER_ADD_ATTACHMENT_MODAL_CAMERA_PICKED: {
    name: '[EDIT_PROFILE] Add Attachment Modal Camera Picked',
    payload: fcast<never>(),
  },
  USER_ADD_ATTACHMENT_MODAL_FILE_PICKED: {
    name: '[EDIT_PROFILE] Add Attachment Modal File Picked',
    payload: fcast<never>(),
  },
  TEAM_UNSUBSCRIBED: {
    name: '[EDIT_PROFILE] Team Unsubscribed',
    payload: fcast<{ teamName: string }>(),
  },
  TEAM_SUBSCRIBED: {
    name: '[EDIT_PROFILE] New Team Subscribed',
    payload: fcast<{ teamNames: string }>(),
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
