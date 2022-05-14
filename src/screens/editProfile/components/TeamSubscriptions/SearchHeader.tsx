import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import CloseIcon from 'assets/icons/icon-close.svg'

export const SearchHeader = ({ handleGoBack }: { handleGoBack: F0 }) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <BaseOpacity padding="m" activeOpacity={0.2} onPress={handleGoBack}>
        <CloseIcon style={styles.closeIcon} />
      </BaseOpacity>
      <Text variant="boldBlackCenter20">{t('subscribeMoreTeams')}</Text>
      <Box paddingRight="s" />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  closeIcon: {
    color: theme.colors.titleActive,
    width: 12,
    height: 12,
    paddingTop: theme.spacing.m,
    paddingLeft: theme.spacing.m,
  },
}))
