import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import CloseIcon from 'assets/icons/icon-close.svg'

export const SearchHeader = ({ handleGoBack }: { handleGoBack: F0 }) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  return (
    <Box>
      <BaseOpacity
        paddingLeft="m"
        activeOpacity={0.2}
        onPress={handleGoBack}
        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CloseIcon style={styles.closeIcon} />
      </BaseOpacity>
      <Text variant="displayBoldSM" marginTop="xm">
        {t('joinTeams')}
      </Text>
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
