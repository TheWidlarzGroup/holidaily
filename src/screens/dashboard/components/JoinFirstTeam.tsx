import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text } from 'utils/theme'
import IconPlus from 'assets/icons/icon-plus-small.svg'

export const JoinFirstTeam = ({ openModal }: { openModal: F0 }) => {
  const { t } = useTranslation('dashboard')

  return (
    <Box
      margin="xm"
      backgroundColor="specialBrighterOpaque"
      borderRadius="lmin"
      padding="m"
      flexDirection="row"
      justifyContent="space-between">
      <Text variant="textBoldSM" marginRight="l" lineHeight={20}>
        {t('joinFirstTeam')}
      </Text>
      <BaseOpacity
        onPress={openModal}
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
