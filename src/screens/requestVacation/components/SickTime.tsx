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
    <Box marginTop="s">
      <Text variant="boldBlack18" textAlign="left">
        {t('sickTimeTitle')}
      </Text>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="body1" textAlign="left">
          {t('sickTimeLabel')}
        </Text>
        <Checkbox checked={sickTime} onPress={toggle} />
      </Box>
    </Box>
  )
}
