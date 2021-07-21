import React, { useCallback } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerNavigationType } from 'navigation/types'
import { Box } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useBooleanState } from 'hooks/useBooleanState'
import { LoadingModal } from 'components/LoadingModal'
import AddToSiriButton, { SiriButtonStyles } from 'react-native-siri-shortcut/AddToSiriButton'
import { presentShortcut, ShortcutOptions } from 'react-native-siri-shortcut'
import { Language } from './components/Language'
import { DarkModeSwitch } from './components/DarkModeSwitch'
import { BiometricPasscode } from './components/BiometricPasscode'

const opts: ShortcutOptions = {
  activityType: 'com.holidaily.AddRequest', // This activity type needs to be set in `NSUserActivityTypes` on the Info.plist
  title: 'Take sickday',
  isEligibleForSearch: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: 'Take sickday',
  userInfo: {
    action: 'sickday',
  },
  needsSave: true,
}
export const Settings = () => {
  const navigation = useNavigation<DrawerNavigationType<'Settings'>>()
  const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] = useBooleanState(false)

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home', {
      screen: 'DashboardNavigation',
      params: {
        screen: 'Dashboard',
      },
    })
  }, [navigation])

  const { t } = useTranslation('settings')

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={t('name')} />
      <Box marginHorizontal="m" flex={1}>
        <DarkModeSwitch />
        <BiometricPasscode />
        <Language setLoadingFalse={setLoadingFalse} setLoadingTrue={setLoadingTrue} />
        <AddToSiriButton
          shortcut={opts}
          style={{ flex: 1 }}
          buttonStyle={SiriButtonStyles.whiteOutline}
          onPress={() => {
            presentShortcut(opts, ({ status }) => {
              console.log(`I was ${status}`)
            })
          }}
        />
      </Box>
      <LoadingModal show={loading} />
    </SafeAreaWrapper>
  )
}
