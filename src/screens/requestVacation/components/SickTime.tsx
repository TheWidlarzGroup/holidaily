import { Checkbox } from 'components/Checkbox'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'utils/theme'

type SickTimeProps = {
  sickTime: boolean
  toggle: F0
}

export const SickTime = ({ sickTime, toggle }: SickTimeProps) => {
  const { t } = useTranslation('requestVacation')
  return (
    <Box marginBottom="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bg="specialOpaque"
        padding="m"
        borderRadius="l2min">
        <Text variant="textSM" textAlign="left">
          {t('sickTimeLabel')}
        </Text>
        <Checkbox size="s" checked={sickTime} onPress={toggle} />
      </Box>
      <Text variant="inputLabel" lineHeight={18}>
        {t('sickTimeDesc')}
      </Text>
    </Box>
  )
}
