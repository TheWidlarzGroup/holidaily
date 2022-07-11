import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { User } from 'mockApi/models'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { Box, Text } from 'utils/theme'

const NOTIFICATION_FROM_APP = ['cancelled', 'accepted', 'prompt']

type NotificationThumbnailProps = {
  author: User
  type: string
}

export const NotificationThumbnail = (props: NotificationThumbnailProps) => {
  const { user } = useUserContext()

  const otherUserPhoto = user?.photo && NOTIFICATION_FROM_APP.includes(props.type)
  const noPhoto = !props.author.photo && !user?.photo && NOTIFICATION_FROM_APP.includes(props.type)

  return (
    <>
      {!!props.author.photo && (
        <FastImage
          source={{ uri: props.author.photo }}
          style={{ borderColor: props.author.userColor, width: 56, borderLeftWidth: 16 }}
        />
      )}
      {!!otherUserPhoto && (
        <FastImage
          source={{ uri: user?.photo || '' }}
          style={{ borderColor: user?.userColor, width: 56, borderLeftWidth: 16 }}
        />
      )}
      {noPhoto && (
        <Box
          style={{
            backgroundColor: user?.userColor,
            width: 56,
            height: 88,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text variant="avatarLG" color="alwaysWhite" padding="xs">
            {`${user?.firstName.charAt(0)}${user?.lastName?.charAt(0)}`}
          </Text>
        </Box>
      )}
    </>
  )
}
