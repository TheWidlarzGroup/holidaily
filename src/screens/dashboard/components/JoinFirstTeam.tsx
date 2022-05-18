import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserProfileType } from 'navigation/types'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'
import { TouchableOpacity } from 'react-native'
import IconPlus from 'assets/icons/icon-plus-small.svg'

export const JoinFirstTeam = () => {
  const { t } = useTranslation('dashboard')
  const { navigate } = useNavigation<UserProfileType<'EditProfile'>>()
  return (
    <Box
      margin="xm"
      backgroundColor="specialBrighterOpaque"
      borderRadius="lmin"
      padding="m"
      flexDirection="row">
      <Text variant="textBoldSM" marginRight="l" lineHeight={20}>
        {t('joinFirstTeam')}
      </Text>
      <TouchableOpacity onPress={() => navigate('ProfileNavigation')}>
        <Box
          width={40}
          height={40}
          backgroundColor="special"
          borderRadius="l"
          justifyContent="center"
          alignItems="center">
          <IconPlus />
        </Box>
      </TouchableOpacity>
    </Box>
  )
}