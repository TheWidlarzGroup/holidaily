import { Checkbox } from 'components/Checkbox'
import React from 'react'
import { Box, Text } from 'utils/theme'

type SickTimeProps = {
  sickTime: boolean
  toggle: F0
}

export const SickTime = ({ sickTime, toggle }: SickTimeProps) => (
  <Box marginTop="s">
    <Text variant="boldBlack18" textAlign="left">
      Sick time off
    </Text>
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <Text variant="body1" textAlign="left">
        I'm not feeling well
      </Text>
      <Checkbox checked={sickTime} onPress={toggle} />
    </Box>
  </Box>
)
