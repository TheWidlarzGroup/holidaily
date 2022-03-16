import React, { useMemo } from 'react'
import { Text } from 'utils/theme'
import { SectionList } from 'react-native'
import * as T from 'types/useFetchNotificationsTypes'
import { Notification } from './Notification'
import { SwipeableNotification } from './SwipeableNotification'

export const NotificationsList = ({ data }: { data: T.Notification[] }) => {
  const { seenNotifications, unseenNotifications } = useMemo(
    () => ({
      seenNotifications: data.filter((n) => n.isSeen),
      unseenNotifications: data.filter((n) => !n.isSeen),
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
        item.isSeen ? (
          <Notification {...item} />
        ) : (
          <SwipeableNotification>
            <Notification {...item} />
          </SwipeableNotification>
        )
      }
    />
  )
}
