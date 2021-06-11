import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconBell from 'assets/icons/icon-bell.svg'

export const DashboardHeader: FC = () => {
  const { t } = useTranslation('dashboard')

  return (
    <Box marginBottom="m" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box flexDirection="row" alignItems="center" justifyContent="flex-start">
        <Box
          bg="white"
          padding="xs"
          paddingLeft="m"
          borderTopRightRadius="lplus"
          borderBottomRightRadius="lplus">
          <IconProfile width={50} height={50} />
        </Box>
        <Text variant="boldBlack18" paddingLeft="xm">
          {t('welcome')}
        </Text>
      </Box>
      <Box padding="m">
        <TouchableOpacity>
          <IconBell />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
