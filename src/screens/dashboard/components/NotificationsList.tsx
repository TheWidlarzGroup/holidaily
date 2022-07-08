import React, { useMemo } from 'react'
import { BaseOpacity, Text, useTheme } from 'utils/theme'
import { SectionList } from 'react-native'
import { Notification as NotificationModel } from 'mockApi/models'
import { useTranslation } from 'react-i18next'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import Notification from './Notification'
import { SwipeableNotification } from './SwipeableNotification'

export const NotificationsList = ({ data }: { data: NotificationModel[] }) => {
  const theme = useTheme()
  const { t } = useTranslation('notifications')
  const { seenNotifications, unseenNotifications } = useMemo(
    () => ({
      seenNotifications: processNotifications(data, 'seen'),
      unseenNotifications: processNotifications(data, 'unseen'),
    }),
    [data]
  )
  const sections = [
    {
      title: t('unseen'),
      data: unseenNotifications,
    },
    {
      title: t('seen'),
      data: seenNotifications,
    },
  ]
  return (
    <SectionList
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: theme.spacing.xxxxl }}
      sections={sections}
      keyExtractor={({ id }) => id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<MarkAllAsSeen unseen={unseenNotifications} />}
      renderSectionHeader={({ section: { title, data } }) =>
        data.length ? (
          <Text variant="inputLabel" marginBottom="s" color="darkGreyBrighter">
            {title}
          </Text>
        ) : null
      }
      renderItem={({ item }) =>
        item.wasSeenByHolder ? (
          <Notification {...item} />
        ) : (
          <SwipeableNotification notificationId={item.id}>
            <Notification {...item} />
          </SwipeableNotification>
        )
      }
    />
  )
}

const MarkAllAsSeen = ({ unseen }: { unseen: NotificationModel[] }) => {
  const { mutate } = useMarkNotificationAsSeen()
  const markAllAsSeen = () => {
    unseen.forEach((n) => mutate(n.id))
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
