import React from 'react'
import { Box, Text } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { Notification as NotificationModel } from 'mockApi/models'
import { NotificationContent } from './NotificationContent'

export const Notification = ({
  source: author,
  wasSeenByHolder,
  type,
  ...p
}: NotificationModel) => {
  const endDate = 'endDate' in p ? new Date(p.endDate) : undefined
  console.log(author)
  return (
    <Box
      backgroundColor="lightGrey"
      borderRadius="lmin"
      marginVertical="m"
      marginTop={0}
      height={90}
      flexDirection="row"
      overflow="hidden"
      opacity={wasSeenByHolder ? 0.6 : 1}>
      {author.photo && (
        <FastImage
          source={{ uri: author.photo }}
          style={{ borderColor: author.color, width: 56, borderLeftWidth: 16 }}
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
          <Text variant="lightGreyRegular">12 minutes ago</Text>
        </Box>
      </Box>
    </Box>
  )
}
