import { Loader } from 'components/Loader'
import { LoadingModal } from 'components/LoadingModal'
import { RadioInput } from 'components/RadioInput'
import { useBooleanState } from 'hooks/useBooleanState'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { Box, mkUseStyles, Text } from 'utils/theme'

export const Language = () => {
  const [opened, { toggle: changeOpened }] = useBooleanState(false)
  const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBooleanState(false)
  const [selectedLng, setSelectedLng] = useState<'en' | 'pl'>('pl')

  const styles = useStyles()

  const { i18n, t } = useTranslation('settings')

  const changeLanguage = (lng: 'pl' | 'en') => {
    if (lng == selectedLng) return
    setLoadingTrue()
    setSelectedLng(lng)
  }

  useEffect(() => {
    i18n.changeLanguage(selectedLng).then(() => setLoadingFalse())
  }, [selectedLng])

  return (
    <Box flex={1}>
      <Box style={styles.container}>
        <Box>
          <Text variant="body1Bold" textAlign="left">
            Language
          </Text>
        </Box>
        <Box>
          <TouchableOpacity style={styles.lng} onPress={() => changeLanguage('en')}>
            <Text variant="body1" marginVertical="s" textAlign="left">
              English
            </Text>
            <RadioInput checked={selectedLng == 'en'} onPress={() => {}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.lng} onPress={() => changeLanguage('pl')}>
            <Text variant="body1" textAlign="left">
              Polish
            </Text>
            <RadioInput checked={selectedLng == 'pl'} onPress={() => {}} />
          </TouchableOpacity>
        </Box>
      </Box>
      <LoadingModal show={loading} />
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
  lng: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))
