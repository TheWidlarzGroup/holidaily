import React, { FC } from 'react'
import { Box, Text, theme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { colors } from 'utils/theme/colors'
import { StyleSheet, TouchableOpacity } from 'react-native'
import IconProfile from 'assets/icons/icon-profile.svg'
import IconBell from 'assets/icons/icon-bell.svg'

export const DashboardHeader: FC = () => {
  const { t } = useTranslation(['dashboard'])

  return (
    <Box style={styles.container}>
      <Box style={styles.userContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <IconProfile style={styles.avatar} width={50} height={50} />
        </TouchableOpacity>
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
    marginBottom: theme.spacing.m,
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
    margin: theme.spacing.xs,
    marginLeft: theme.spacing.m,
  },
  icon: {
    margin: theme.spacing.m,
  },
})
