import React, { useEffect, useState } from 'react'
import { Checkbox } from 'components/Checkbox'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { LoadingModal } from 'components/LoadingModal'

const TIMEOUT = 100

export const DarkModeSwitch = () => {
  const [mode, setMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const styles = useStyles()
  const { t } = useTranslation('settings')
  const { userSettings, updateSettings } = useUserSettingsContext()

  useEffect(() => {
    const updateMode = userSettings?.darkMode || false
    setIsLoading(false)
    setMode(updateMode)
  }, [userSettings])

  const switchMode = () => {
    setIsLoading(true)
    setMode((prev) => !prev)
    const delay = setTimeout(() => {
      updateSettings({ darkMode: !mode })
    }, TIMEOUT)
    return () => {
      clearTimeout(delay)
    }
  }

  return (
    <>
      {isLoading && <LoadingModal style={{ position: 'absolute', zIndex: 20 }} show />}
      <Box style={styles.container}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text variant="body1Bold" textAlign="left">
            {t('darkmode')}
          </Text>
          <Checkbox checked={mode} onPress={switchMode} size="s" />
        </Box>
      </Box>
    </>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.dropdownBackground,
    borderRadius: theme.borderRadii.lmin,
    paddingHorizontal: theme.spacing.ml,
    paddingLeft: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    marginTop: theme.spacing.l2plus,
    marginBottom: theme.spacing.s,
  },
}))
