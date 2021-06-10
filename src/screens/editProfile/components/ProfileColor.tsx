import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text } from 'utils/theme'

export const ProfileColor: FC = () => {
  const { t } = useTranslation('userProfile')

  const onChangeUserColor = () => {
    console.log('change user color')
    // TODO display modal to change user color
  }

  return (
    <Box paddingHorizontal="m" marginBottom="xl">
      <Text variant="label1" marginLeft="m">
        {t('userColor')}
      </Text>
      <BaseOpacity
        onPress={onChangeUserColor}
        marginTop="xm"
        marginLeft="m"
        height={44}
        width={44}
        backgroundColor="errorRed"
        borderRadius="full"></BaseOpacity>
    </Box>
  )
}
