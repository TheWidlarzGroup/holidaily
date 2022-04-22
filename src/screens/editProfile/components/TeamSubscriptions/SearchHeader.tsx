import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, Text } from 'utils/theme'
import IconBack from 'assets/icons/icon-back.svg'

export const SearchHeader = ({ handleGoBack }: { handleGoBack: F0 }) => {
  const { t } = useTranslation('userProfile')
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <TouchableOpacity activeOpacity={0.2} onPress={handleGoBack}>
        <IconBack />
      </TouchableOpacity>
      <Text style={{ transform: [{ translateX: -20 }] }} variant="boldBlackCenter20">
        {t('subscribeMoreTeams')}
      </Text>
      <Box />
    </Box>
  )
}
