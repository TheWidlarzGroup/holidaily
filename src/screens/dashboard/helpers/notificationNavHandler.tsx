export const notificationNavHandler = (navigate: any, type: string, requestId?: string) => {
  if (type === 'accepted' || type === 'cancelled')
    navigate('DRAWER_NAVIGATOR', {
      screen: 'Home',
      params: {
        screen: 'Stats',
        params: {
          screen: 'SEE_REQUEST',
          params: { id: requestId },
        },
      },
    })
  if (type === 'prompt') navigate('CALENDAR')
  else navigate('FEED', { postId: 3 })
}
