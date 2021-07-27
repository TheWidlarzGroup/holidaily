import OneSignal from 'react-native-onesignal'

// OneSignal Init Code
OneSignal.setLogLevel(6, 0)
OneSignal.setAppId('7d186f7d-3d0f-481f-a558-15aa4e1f5aa4')
// END OneSignal Init Code

// Prompt for push on iOS
// OneSignal.promptForPushNotificationsWithUserResponse((response) => {
//   console.log('Prompt response:', response)
// })

// Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
  console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent)
  const notification = notificationReceivedEvent.getNotification()
  console.log('notification: ', notification)
  const data = notification.additionalData
  console.log('additionalData: ', data)
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification)
})

// Method for handling notifications opened
OneSignal.setNotificationOpenedHandler((notification) => {
  console.log('OneSignal: notification opened:', notification)
})
