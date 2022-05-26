import { useEffect } from 'react'
import OneSignal from 'react-native-onesignal'

export const useOneSignal = () => {
  useEffect(() => {
    // OneSignal Init Code
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId('7d186f7d-3d0f-481f-a558-15aa4e1f5aa4')
    // END OneSignal Init Code

    // Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
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
