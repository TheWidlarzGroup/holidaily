import { UserData } from 'contexts/UserContext'
import { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'

export const useOneSignal = (user: Pick<UserData, 'id'> | null) => {
  useEffect(() => {
    // OneSignal Init Code
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId('7d186f7d-3d0f-481f-a558-15aa4e1f5aa4')
    // END OneSignal Init Code

    // Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.log('Prompt response:', response)
    })

    // Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
      if (__DEV__)
        console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent)
      const notification = notificationReceivedEvent.getNotification()
      if (__DEV__) console.log('notification: ', notification)
      const data = notification.additionalData
      if (__DEV__) console.log('additionalData: ', data)
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification)
    })

    // Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      if (__DEV__) console.log('OneSignal: notification opened:', notification)
    })
  }, [])

  useEffect(() => {
    console.log('change')
    console.log(user?.id)
    if (!user) return

    let externalUserId = user.id ? user.id : ''
    let externalUserIdAuthHash = '565cf52672e15e9cfa6931ed9502d87c4c923e6dfb022b51047a616ea8f92ee5'

    OneSignal.setExternalUserId(externalUserId, externalUserIdAuthHash, (results) => {
      console.log(results)
    })
  }, [user?.id])
}
