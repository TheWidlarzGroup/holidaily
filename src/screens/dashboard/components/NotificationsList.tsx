import React, { useMemo } from 'react'
import { BaseOpacity, Text } from 'utils/theme'
import { Notification as NotificationModel } from 'mockApi/models'
import { useTranslation } from 'react-i18next'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import { ScrollView } from 'react-native-gesture-handler'
import { Notification } from './Notification'
import { SwipeableNotification } from './SwipeableNotification'

const style = { width: '100%' }

export const NotificationsList = ({ data }: { data: NotificationModel[] }) => {
  const { t } = useTranslation('notifications')
  const { unseenNotifications } = useMemo(
    () => ({
      unseenNotifications: processNotifications(data, 'unseen'),
    }),
    [data]
  )

  const seenNotificationsList = data.filter(
    (notification) => notification.wasSeenByHolder === false
  )
  const unseenNotificationsList = data.filter(
    (notification) => notification.wasSeenByHolder === true
  )

  const isSeenNotificationsList = seenNotificationsList.length > 0
  const isUnseenNotificationsList = unseenNotificationsList.length > 0

  return (
    <>
      {isSeenNotificationsList && <MarkAllAsSeen unseen={unseenNotifications} />}
      <ScrollView style={style} showsVerticalScrollIndicator={false}>
        {isSeenNotificationsList && (
          <>
            <Text variant="inputLabel" marginBottom="s" color="darkGreyBrighter">
              {t('unseen')}
            </Text>
            {seenNotificationsList.map((item: NotificationModel) => (
              <SwipeableNotification
                key={item.id}
                notificationId={item.id}
                isSeen={item.wasSeenByHolder}>
                <Notification {...item} />
              </SwipeableNotification>
            ))}
          </>
        )}
        {isUnseenNotificationsList && (
          <>
            <Text variant="inputLabel" marginBottom="s" color="darkGreyBrighter">
              {t('seen')}
            </Text>
            {unseenNotificationsList.map((item: NotificationModel) => (
              <SwipeableNotification
                key={item.id}
                notificationId={item.id}
                isSeen={item.wasSeenByHolder}>
                <Notification {...item} />
              </SwipeableNotification>
            ))}
          </>
        )}
      </ScrollView>
    </>
  )
}

const MarkAllAsSeen = ({ unseen }: { unseen: NotificationModel[] }) => {
  const { mutate } = useMarkNotificationAsSeen()
  const markAllAsSeen = () => {
    unseen.forEach((n) => mutate({ id: n.id }))
  }
  const { t } = useTranslation('notifications')
  if (unseen.length < 2) return null

  return (
    <BaseOpacity onPress={markAllAsSeen} marginTop="s" marginBottom="s" alignSelf="flex-end">
      <Text variant="textSM" color="darkGreyBrighter">
        {t('markAllAsSeen')}
      </Text>
    </BaseOpacity>
  )
}

const processNotifications = (notifications: NotificationModel[], mode: 'seen' | 'unseen') => {
  notifications = notifications.filter((n) =>
    mode === 'seen' ? n.wasSeenByHolder : !n.wasSeenByHolder
  )
  return notifications.sort((prevNotif, nextNotif) => {
    const prevTime = new Date(prevNotif.createdAt).getTime()
    const nextTime = new Date(nextNotif.createdAt).getTime()
    return nextTime - prevTime
  })
}
