import { Checkbox } from 'components/Checkbox'
import { useAppColorScheme } from 'hooks/useAppColorScheme'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Text } from 'utils/theme'

export const DarkModeSwitch = () => {
  const styles = useStyles()
  const [colorScheme, setColorScheme] = useAppColorScheme()

  const { t } = useTranslation('settings')

  const handleCheck = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Box style={styles.container}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="body1Bold" textAlign="left">
          {t('darkmode')}
        </Text>
        <Checkbox checked={colorScheme === 'dark'} onPress={handleCheck} size="s" />
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.disabledText,
    borderRadius: theme.borderRadii.lplus,
    padding: theme.spacing.ml,
    marginVertical: theme.spacing.s,
  },
}))
