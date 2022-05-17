import React from 'react'
import IconBell from 'assets/icons/icon-bell.svg'
import { BaseOpacity, Text, Box, theme } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'

export const NotificationsBell = ({ unseenCount }: { unseenCount: number }) => {
  const navigation = useNavigation()
  return (
    <BaseOpacity
      padding="m"
      alignItems="center"
      position="absolute"
      right={16}
      height={45}
      width={45}
      onPress={() => navigation.navigate('DashboardNotifications')}>
      {!!unseenCount && (
        <Box
          borderRadius="full"
          position="absolute"
          width={17}
          aspectRatio={1}
          left={7}
          top={10}
          zIndex="2"
          backgroundColor="errorRed"
          justifyContent="center"
          alignItems="center">
          <Text variant="boldWhite12" color="alwaysWhite">
            {unseenCount}
          </Text>
        </Box>
      )}
      <IconBell color={theme.colors.headerGrey} />
    </BaseOpacity>
  )
}
