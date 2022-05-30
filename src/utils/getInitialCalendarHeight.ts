import { BASE_CALENDAR_HEIGHT, WEEK_CALENDAR_HEIGHT } from 'screens/calendar/utils'

export const getInitialCalendarHeight = (
  isScreenHeightShort: boolean,
  hasUserSeenCalendar: boolean
) => {
  switch (true) {
    case isScreenHeightShort && hasUserSeenCalendar:
      return WEEK_CALENDAR_HEIGHT
    case !isScreenHeightShort && hasUserSeenCalendar:
      return BASE_CALENDAR_HEIGHT
    case isScreenHeightShort && !hasUserSeenCalendar:
      return BASE_CALENDAR_HEIGHT
    case !isScreenHeightShort && !hasUserSeenCalendar:
      return WEEK_CALENDAR_HEIGHT
    default:
      return BASE_CALENDAR_HEIGHT
  }
}
