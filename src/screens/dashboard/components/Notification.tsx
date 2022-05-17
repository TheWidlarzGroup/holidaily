import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { Notification as NotificationModel } from 'mockApi/models'
import { formatDate } from 'utils/formatDate'
import { useNavigation } from '@react-navigation/native'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import { NotificationContent } from './NotificationContent'

export const Notification = ({
  source: author,
  wasSeenByHolder,
  type,
  ...p
}: NotificationModel) => {
  const endDate = 'endDate' in p ? new Date(p.endDate) : undefined
  const { navigate } = useNavigation()
  const { mutate } = useMarkNotificationAsSeen()
  const opacity = wasSeenByHolder ? 0.6 : 1
  const onPress = () => {
    if (!wasSeenByHolder) mutate(p.id)
    if (type === 'dayOff') navigate('Calendar')
    else navigate('Feed', { postId: 3 })
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
      {author.photo && (
        <FastImage
          source={{ uri: author.photo }}
          style={{ borderColor: author.userColor, width: 56, borderLeftWidth: 16 }}
        />
      )}
      <Box flex={1}>
        <NotificationContent
          endDate={endDate}
          type={type}
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
