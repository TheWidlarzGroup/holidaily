import React, { useContext, useEffect, useState } from 'react'
import { Checkbox } from 'components/Checkbox'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { UserSettingsContext } from 'contexts/UserSettingsContext'

const TIMEOUT = 50

export const DarkModeSwitch = () => {
  const [mode, setMode] = useState(false)
  const styles = useStyles()
  const { t } = useTranslation('settings')
  const settingsCtx = useContext(UserSettingsContext)

  useEffect(() => {
    const updateMode = settingsCtx?.userSettings?.darkMode || false
    setMode(updateMode)
  }, [settingsCtx])

  const switchMode = () => {
    const update = settingsCtx?.updateSettings
    setMode((prev) => !prev)
    setTimeout(() => {
      if (update) update({ darkMode: !mode })
    }, TIMEOUT)
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
