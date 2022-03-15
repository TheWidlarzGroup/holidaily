import React, { useMemo } from 'react'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import { SectionList } from 'react-native'
import { Trans } from 'react-i18next'
import FastImage, { Source } from 'react-native-fast-image'
import { Notification } from 'types/useFetchNotificationsTypes'

export const NotificationsList = ({ data }: { data: Notification[] }) => {
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
      renderItem={({ item }) => <NotificationItem {...item} />}
    />
  )
}

const NotificationItem = ({ createdAt, author, isSeen, type, ...p }: Notification) => {
  const endDate = type === 'dayOff' ? (p as { endDate: string }).endDate : undefined
  const styles = useStyles()
  return (
    <Box
      backgroundColor="lightGrey"
      borderRadius="lmin"
      margin="m"
      marginTop={0}
      height={90}
      flexDirection="row"
      overflow="hidden"
      opacity={isSeen ? 0.6 : 1}>
      {author.photo && <FastImage source={author.photo as Source} style={[styles.avatar]} />}
      <Box flex={1}>
        <Box flexDirection={'row'} justifyContent="space-between">
          <Box flex={1} padding="m">
            <Text key={createdAt}>
              <Trans
                ns="notifications"
                i18nKey={type}
                values={{
                  author: `${author.firstName} ${author.lastName}`,
                  endDate,
                }}
                components={{ b: <Text variant={'bold16'} lineHeight={20} /> }}
              />
            </Text>
          </Box>
          {!isSeen && (
            <Box
              backgroundColor="black"
              borderTopRightRadius="lmin"
              borderBottomLeftRadius="lmin"
              paddingVertical="xs"
              paddingHorizontal="m"
              height={32}>
              <Text variant="boldWhite12">new</Text>
            </Box>
          )}
        </Box>
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
