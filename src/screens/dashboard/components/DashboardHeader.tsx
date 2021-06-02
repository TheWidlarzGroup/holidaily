import React, { FC } from 'react'
import { Box, Text, theme } from 'utils/theme'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconBell from 'assets/icons/icon-bell.svg'
import { useTranslation } from 'react-i18next'
import { colors } from 'utils/theme/colors'
import { StyleSheet } from 'react-native'

export const DashboardHeader: FC = () => {
  const { t } = useTranslation(['dashboard'])

  return (
    <Box style={styles.container}>
      <Box style={styles.userContainer}>
        <Box style={styles.iconContainer}>
          <IconProfile style={styles.avatar} width={50} height={50} />
        </Box>
        <Text variant="boldBlack18" paddingLeft="xm">
          {t('welcome')}
        </Text>
      </Box>
      <IconBell style={styles.icon} />
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
  iconContainer: {
    backgroundColor: colors.white,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
  },
  avatar: {
    margin: theme.spacing.s,
    marginLeft: theme.spacing.m,
  },
  icon: {
    margin: theme.spacing.m,
  },
})
