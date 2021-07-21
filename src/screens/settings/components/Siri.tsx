import React from 'react'
import { presentShortcut } from 'react-native-siri-shortcut'
import AddtoSiriButton, { SiriButtonStyles } from 'react-native-siri-shortcut/AddToSiriButton'
import { sickday } from 'utils/siriShortcuts'
import { Box } from 'utils/theme'

export const Siri = () => (
  <Box marginVertical="l" flexDirection="row" justifyContent="space-between" alignItems="center">
    <AddtoSiriButton
      shortcut={sickday}
      style={{ flex: 1 }}
      buttonStyle={SiriButtonStyles.whiteOutline}
      onPress={() => {
        presentShortcut(sickday, ({ status }) => {
          console.log(`Shortcut "${sickday.title}" was ${status}`)
        })
      }}
    />
  </Box>
)
