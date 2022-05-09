import React, { useEffect, useState } from 'react'
import { Checkbox } from 'components/Checkbox'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { useUserSettingsContext } from 'hooks/useUserSettingsContext'

const TIMEOUT = 50

export const DarkModeSwitch = () => {
  const [mode, setMode] = useState(false)
  const styles = useStyles()
  const { t } = useTranslation('settings')
  const { userSettings, updateSettings } = useUserSettingsContext()

  useEffect(() => {
    const updateMode = userSettings === 'true'
    setMode(updateMode)
  }, [userSettings])

  const switchMode = () => {
    const update = updateSettings
    setMode((prev) => !prev)
    const delay = setTimeout(() => {
      if (update) update(JSON.stringify(!mode))
    }, TIMEOUT)
    return () => {
      clearTimeout(delay)
    }
  }

  return (
    <Box style={styles.container}>
      <Box marginLeft="xxm" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="body1Bold" textAlign="left">
          {t('darkmode')}
        </Text>
        <Checkbox checked={mode} onPress={switchMode} size="s" />
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
