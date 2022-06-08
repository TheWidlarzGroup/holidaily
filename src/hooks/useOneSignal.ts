import { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'
import { ONESIGNAL_API_KEY } from '@env'

export const useOneSignal = () => {
  useEffect(() => {
    if (!ONESIGNAL_API_KEY) return

    // OneSignal Init Code
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId(ONESIGNAL_API_KEY)
    // END OneSignal Init Code

    // Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse((_response) => {
      // console.log('Prompt response:', response)
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
}
