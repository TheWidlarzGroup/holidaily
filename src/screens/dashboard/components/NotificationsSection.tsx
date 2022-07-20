import React from 'react'
import { Text } from 'utils/theme'
import { Notification as NotificationModel } from 'mockApi/models'
import { Notification } from './Notification'
import { SwipeableNotification } from './SwipeableNotification'

type NotificationsSectionProps = {
  heading: string
  notificationsList: NotificationModel[]
}

export const NotificationsSection = (props: NotificationsSectionProps) => {
  const isSeen = props.notificationsList.filter(
    (item: NotificationModel) => item.wasSeenByHolder === true
  )
  const marginTop = isSeen.length > 0 ? 'l' : 'none'

  return (
    <>
      <Text
        variant="inputLabel"
        marginBottom="s"
        marginTop={marginTop}
        color="darkGreyBrighter"
        lineHeight={18}>
        {props.heading}
      </Text>
      {props.notificationsList.map((item: NotificationModel) => (
        <SwipeableNotification key={item.id} notificationId={item.id} isSeen={item.wasSeenByHolder}>
          <Notification {...item} />
        </SwipeableNotification>
      ))}
    </>
  )
}
