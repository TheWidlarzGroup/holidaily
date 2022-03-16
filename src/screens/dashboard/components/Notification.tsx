import React from 'react'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import FastImage, { Source } from 'react-native-fast-image'
import * as T from 'types/useFetchNotificationsTypes'
import { NotificationContent } from './NotificationContent'

export const Notification = ({ author, isSeen, type, ...p }: T.Notification) => {
  const endDate = type === 'dayOff' ? (p as { endDate: string }).endDate : undefined
  const styles = useStyles()

  return (
    <Box
      backgroundColor="lightGrey"
      borderRadius="lmin"
      marginVertical="m"
      marginTop={0}
      height={90}
      flexDirection="row"
      overflow="hidden"
      opacity={isSeen ? 0.6 : 1}>
      {author.photo && <FastImage source={author.photo as Source} style={[styles.avatar]} />}
      <Box flex={1}>
        <NotificationContent
          endDate={endDate}
          type={type}
          firstName={author.firstName}
          lastName={author.lastName}
          isSeen={isSeen}
        />
        <Box paddingBottom="s" paddingRight="s" alignSelf="flex-end">
          <Text variant="lightGreyRegular">12 minutes ago</Text>
        </Box>
      </Box>
    </Box>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  avatar: { width: 56, borderLeftWidth: 16, borderColor: theme.colors.primary },
}))
