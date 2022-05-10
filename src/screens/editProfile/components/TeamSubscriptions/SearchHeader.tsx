import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box, mkUseStyles, Text } from 'utils/theme'
import IconBack from 'assets/icons/icon-back2.svg'

export const SearchHeader = ({ handleGoBack }: { handleGoBack: F0 }) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <TouchableOpacity activeOpacity={0.2} onPress={handleGoBack}>
        <IconBack height={18} width={18} color={styles.arrow.color} />
      </TouchableOpacity>
      <Text variant="boldBlackCenter20">{t('subscribeMoreTeams')}</Text>
      <Box paddingRight="s" />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  arrow: {
    color: theme.colors.black,
  },
}))
