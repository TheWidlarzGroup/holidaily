import { DayOffRequest } from 'mockApi/models'

export const notificationNavHandler = (
  navigate: any,
  type: string,
  notificationRequest?: DayOffRequest
) => {
  if (type === 'accepted' || type === 'cancelled')
    navigate('DRAWER_NAVIGATOR', {
      screen: 'Home',
      params: {
        screen: 'Stats',
        params: {
          screen: 'SEE_REQUEST',
          params: { ...notificationRequest, prevScreen: 'NOTIFICATIONS' },
        },
      },
    })
  if (type === 'prompt') navigate('CALENDAR', { prevScreen: 'NOTIFICATIONS' })
  else navigate('FEED', { postId: 3 })
}
