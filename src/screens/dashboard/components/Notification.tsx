import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { Notification as NotificationModel } from 'mockApi/models'
import { formatDate } from 'utils/formatDate'
import { useNavigation } from '@react-navigation/native'
import { NotificationContent } from './NotificationContent'

export const Notification = ({
  source: author,
  wasSeenByHolder,
  type,
  ...p
}: NotificationModel) => {
  const endDate = 'endDate' in p ? new Date(p.endDate) : undefined
  const { navigate } = useNavigation()
  const opacity = wasSeenByHolder ? 0.6 : 1
  return (
    <BaseOpacity
      activeOpacity={opacity}
      onPress={() => navigate('Feed')}
      opacity={opacity}
      backgroundColor="lightGrey"
      borderRadius="lmin"
      marginVertical="m"
      marginTop={0}
      height={90}
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
        <Box paddingBottom="s" paddingRight="s" alignSelf="flex-end">
          <Text variant="lightGreyRegular">{formatDate(new Date(p.createdAt), 'ago')}</Text>
        </Box>
      </Box>
    </BaseOpacity>
  )
}
