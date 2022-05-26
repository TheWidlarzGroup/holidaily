import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text } from 'utils/theme'
import IconPlus from 'assets/icons/icon-plus-small.svg'
import { ModalNavigationType } from 'navigation/types'

export const JoinFirstTeam = () => {
  const { t } = useTranslation('dashboard')
  const { navigate } = useNavigation<ModalNavigationType<'SUBSCRIBE_NEW_TEAM'>>()

  const onSubscribeTeam = () => {
    navigate('SUBSCRIBE_NEW_TEAM')
  }

  return (
    <Box
      margin="xm"
      backgroundColor="specialBrighterOpaque"
      borderRadius="lmin"
      padding="m"
      flexDirection="row"
      justifyContent="space-between">
      <Box width="80%">
        <Text variant="textBoldSM" lineHeight={20}>
          {t('joinFirstTeam')}
        </Text>
      </Box>
      <BaseOpacity
        alignSelf="flex-end"
        onPress={onSubscribeTeam}
        width={40}
        height={40}
        backgroundColor="special"
        borderRadius="l"
        justifyContent="center"
        alignItems="center">
        <IconPlus />
      </BaseOpacity>
    </Box>
  )
}
