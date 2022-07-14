import React from 'react'
import { Text } from 'utils/theme'
import { Notification as NotificationModel } from 'mockApi/models'
import { Notification } from './Notification'
import { SwipeableNotification } from './SwipeableNotification'

type NotificationsSectionProps = {
  heading: string
  notificationsList: NotificationModel[]
}

export const NotificationsSection = (props: NotificationsSectionProps) => (
  <>
    <Text variant="inputLabel" marginBottom="s" color="darkGreyBrighter">
      {props.heading}
    </Text>
    {props.notificationsList.map((item: NotificationModel) => (
      <SwipeableNotification key={item.id} notificationId={item.id} isSeen={item.wasSeenByHolder}>
        <Notification {...item} />
      </SwipeableNotification>
    ))}
  </>
)
