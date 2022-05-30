import { BASE_CALENDAR_HEIGHT, WEEK_CALENDAR_HEIGHT } from 'screens/calendar/utils'

export const getInitialCalendarHeight = (
  isScreenHeightShort: boolean,
  hasUserSeenCalendar: boolean
) => {
  if (isScreenHeightShort && hasUserSeenCalendar) return WEEK_CALENDAR_HEIGHT
  if (!isScreenHeightShort && !hasUserSeenCalendar) return WEEK_CALENDAR_HEIGHT
  return BASE_CALENDAR_HEIGHT
}
