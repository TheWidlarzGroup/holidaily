import React, { useMemo } from 'react'
import { BaseOpacity, Text } from 'utils/theme'
import { Notification as NotificationModel } from 'mockApi/models'
import { useTranslation } from 'react-i18next'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import { ScrollView } from 'react-native-gesture-handler'
import { NotificationsSection } from './NotificationsSection'

const style = { width: '100%' }

export const NotificationsList = ({ data }: { data: NotificationModel[] }) => {
  const { t } = useTranslation('notifications')
  const { unseenNotifications } = useMemo(
    () => ({
      unseenNotifications: processNotifications(data, 'unseen'),
    }),
    [data]
  )

  const seenNotificationsList: NotificationModel[] = processNotifications(data, 'unseen')
  const unseenNotificationsList: NotificationModel[] = processNotifications(data, 'seen')

  return (
    <ScrollView style={style} showsVerticalScrollIndicator={false}>
      {seenNotificationsList.length > 0 && (
        <>
          <MarkAllAsSeen unseen={unseenNotifications} />
          <NotificationsSection heading={t('unseen')} notificationsList={seenNotificationsList} />
        </>
      )}
      {unseenNotificationsList.length > 0 && (
        <NotificationsSection heading={t('seen')} notificationsList={unseenNotificationsList} />
      )}
    </ScrollView>
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
