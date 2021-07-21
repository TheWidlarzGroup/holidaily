import React from 'react'
import { presentShortcut, ShortcutOptions } from 'react-native-siri-shortcut'
import AddtoSiriButton, { SiriButtonStyles } from 'react-native-siri-shortcut/AddToSiriButton'
import { Box, mkUseStyles } from 'utils/theme'

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

export const Siri = () => (
  <Box marginVertical="l" flexDirection="row" justifyContent="space-between" alignItems="center">
    <AddtoSiriButton
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
)
