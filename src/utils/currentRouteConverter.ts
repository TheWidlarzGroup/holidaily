import { AnalyticsEvent } from './eventMap'

export const currentRouteConverter = (routeName: string) => {
  const routeNameModified = routeName.toUpperCase()
  let eventName: keyof AnalyticsEvent = 'DASHBOARD_VIEWED'

  if (routeNameModified === 'CALENDAR') eventName = 'CALENDAR_VIEWED'
  if (routeNameModified === 'FEED') eventName = 'FEED_VIEWED'
  if (routeNameModified === 'WELCOME') eventName = 'WELCOME_VIEWED'
  if (routeNameModified === 'SLIDER') eventName = 'SLIDER_VIEWED'
  if (routeNameModified === 'ABOUT') eventName = 'ABOUT_VIEWED'
  if (routeNameModified === 'BUDGET') eventName = 'BUDGET_VIEWED'
  if (routeNameModified === 'SEE_REQUEST') eventName = 'SEE_REQUEST_VIEWED'
  if (routeNameModified === 'CREATEPOST') eventName = 'CREATE_POST_VIEWED'
  if (routeNameModified === 'REQUESTVACATION') eventName = 'ADD_REQUEST_VIEWED'
  if (routeNameModified === 'DASHBOARDTEAM') eventName = 'DASHBOARD_TEAM_VIEWED'
  if (routeNameModified === 'STATSANDREQUESTS') eventName = 'STATS_AND_REQUESTS_VIEWED'
  if (routeNameModified === 'DASHBOARDNOTIFICATIONS') eventName = 'NOTIFICATIONS_VIEWED'
  if (routeNameModified === 'PTO_POLICY_VIEWED') eventName = 'PTO_POLICY_VIEWED'
  if (routeNameModified === 'EDITPROFILE') eventName = 'EDIT_PROFILE_VIEWED'
  if (routeNameModified === 'SUBSCRIBENEWTEAM') eventName = 'SUBSCRIBE_NEW_TEAM_VIEWED'
  if (routeNameModified === 'COLORPICKER') eventName = 'COLOR_PICKER_VIEWED'
  if (routeNameModified === 'REQUESTVACATIONCALENDAR')
    eventName = 'STATS_AND_REQUESTS_CALENDAR_VIEWED'

  return eventName
}
