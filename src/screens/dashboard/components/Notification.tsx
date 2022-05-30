import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { Notification as NotificationModel } from 'mockApi/models'
import { formatDate } from 'utils/formatDate'
import { useNavigation } from '@react-navigation/native'
import { useMarkNotificationAsSeen } from 'dataAccess/mutations/useMarkNotificationAsSeen'
import { useUserContext } from 'hooks/useUserContext'
import { NotificationContent } from './NotificationContent'

export const Notification = ({
  source: author,
  wasSeenByHolder,
  type,
  ...p
}: NotificationModel) => {
  const { user } = useUserContext()
  const endDate = 'endDate' in p ? new Date(p.endDate) : undefined
  const { navigate } = useNavigation()
  const { mutate } = useMarkNotificationAsSeen()
  const opacity = wasSeenByHolder ? 0.6 : 1
  const onPress = () => {
    if (!wasSeenByHolder) mutate(p.id)
    if (type === 'prompt') navigate('CALENDAR')
    else navigate('FEED', { postId: 3 })
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
      {user?.photo && type === 'prompt' && (
        <FastImage
          source={{ uri: user?.photo }}
          style={{ borderColor: user?.userColor, width: 56, borderLeftWidth: 16 }}
        />
      )}
      {!author.photo && !user?.photo && type === 'prompt' && (
        <Box
          style={{
            backgroundColor: user?.userColor,
            width: 56,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text variant="avatarLG" color="alwaysWhite" padding="xs">{`${user?.firstName.charAt(
            0
          )}${user?.lastName?.charAt(0)}`}</Text>
        </Box>
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
