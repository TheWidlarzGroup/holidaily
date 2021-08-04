import React from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Box, Text } from 'utils/theme'
import BackArrowIcon from 'assets/icons/backArrow.svg'
import { useTranslation } from 'react-i18next'

export const HeaderRequestVacation = () => {
  const navigation = useNavigation()
  const { t } = useTranslation('requestVacation')

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="l"
      paddingVertical="m"
      paddingTop={0}>
      <Box alignItems="center" justifyContent="center" flexDirection="row">
        <Pressable onPress={navigation.goBack}>
          <BackArrowIcon width={30} height={20} />
        </Pressable>
      </Box>
      <Box flex={1} marginRight="l">
        <Text variant="modalHeader" textAlign="center">
          {t('title')}
        </Text>
      </Box>
    </Box>
  )
}
