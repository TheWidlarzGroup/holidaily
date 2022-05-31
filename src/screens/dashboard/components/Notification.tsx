import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { Notification as NotificationModel } from 'mockApi/models'
import { formatDate } from 'utils/formatDate'
import { useNavigation } from '@react-navigation/native'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import { NotificationContent } from './NotificationContent'
import { notificationNavHandler } from '../helpers/notificationNavHandler'
import { NotificationThumbnail } from './NotificationThumbnail'

export const Notification = ({
  source: author,
  wasSeenByHolder,
  type,
  ...p
}: NotificationModel) => {
  const endDate = 'endDate' in p ? new Date(p.endDate) : undefined
  const description = 'description' in p ? p.description : undefined
  const { navigate } = useNavigation()
  const { mutate } = useMarkNotificationAsSeen()
  const opacity = wasSeenByHolder ? 0.6 : 1
  const onPress = () => {
    if (!wasSeenByHolder) mutate(p.id)
    notificationNavHandler(navigate, type, p.requestId)
  }

  return (
    <BaseOpacity
      activeOpacity={1}
      onPress={onPress}
      opacity={opacity}
      backgroundColor="lightGrey"
      borderRadius="lmin"
      marginVertical="s"
      marginTop="none"
      height={88}
      flexDirection="row"
      overflow="hidden">
      <NotificationThumbnail author={author} type={type} />
      <Box flex={1}>
        <NotificationContent
          endDate={endDate}
          type={type}
          description={description}
          firstName={author.firstName}
          lastName={author.lastName}
          isSeen={wasSeenByHolder}
        />
        <Box marginBottom="s" marginRight="m" alignSelf="flex-end">
          <Text variant="textXS" color="darkGreyBrighter">
            {formatDate(new Date(p.createdAt), 'ago')}
          </Text>
        </Box>
      </Box>
    </BaseOpacity>
  )
}
