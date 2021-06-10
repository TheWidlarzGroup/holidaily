import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { Pressable, StatusBar } from 'react-native'
import BackArrowIcon from 'assets/icons/backArrow.svg'
import { useNavigation } from '@react-navigation/core'

export const HeaderRequestVacation: FC = () => {
  const navigation = useNavigation()

  return (
    <Box flexDirection="row" alignItems="center" paddingHorizontal="l" paddingBottom="l">
      <Box alignItems="center" justifyContent="center" flexDirection="row">
        <Pressable onPress={() => navigation.goBack()}>
          <BackArrowIcon width={30} height={20} />
        </Pressable>
      </Box>
      <Box flex={1} marginRight="l">
        <Text variant="modalHeader" textAlign="center">
          Take time off
        </Text>
      </Box>
    </Box>
  )
}
