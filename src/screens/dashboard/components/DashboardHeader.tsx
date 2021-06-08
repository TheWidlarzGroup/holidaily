import React, { FC } from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconBell from 'assets/icons/icon-bell.svg'

export const DashboardHeader: FC = () => {
  const { t } = useTranslation('dashboard')

  return (
    <Box marginBottom="m" style={styles.container}>
      <Box style={styles.userContainer}>
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
        <IconBell />
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
