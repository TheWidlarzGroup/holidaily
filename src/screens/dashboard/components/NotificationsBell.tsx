import React from 'react'
import IconBell from 'assets/icons/icon-bell.svg'
import { BaseOpacity, Text, Box } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'

export const NotificationsBell = ({ unseenCount }: { unseenCount: number }) => {
  const navigation = useNavigation()
  return (
    <BaseOpacity
      padding="m"
      alignItems="center"
      height={45}
      width={45}
      onPress={() => {
        console.log('nav')
        navigation.navigate('DashboardNotifications')
      }}>
      {!!unseenCount && (
        <Box
          borderRadius="full"
          position="absolute"
          width={19}
          height={19}
          left={20}
          top={8}
          zIndex="2"
          backgroundColor="errorRed"
          justifyContent="center"
          alignItems="center">
          <Text color="white" variant="boldWhite12">
            {unseenCount}
          </Text>
        </Box>
      )}
      <IconBell />
    </BaseOpacity>
  )
}
