import React, { useMemo } from 'react'
import { Text } from 'utils/theme'
import { SectionList } from 'react-native'
import { Notification as NotificationModel } from 'mockApi/models'
import { Notification } from './Notification'
import { SwipeableNotification } from './SwipeableNotification'

export const NotificationsList = ({ data }: { data: NotificationModel[] }) => {
  const { seenNotifications, unseenNotifications } = useMemo(
    () => ({
      seenNotifications: data.filter((n) => n.wasSeenByHolder),
      unseenNotifications: data.filter((n) => !n.wasSeenByHolder),
    }),
    [data]
  )

  return (
    <SectionList
      style={{ width: '100%' }}
      sections={[
        {
          title: 'unseen',
          data: unseenNotifications,
        },
        {
          title: 'seen',
          data: seenNotifications,
        },
      ]}
      keyExtractor={({ id }) => id}
      renderSectionHeader={({ section: { title, data } }) =>
        data.length ? (
          <Text variant="lightGreyRegular" margin="xm">
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
