import React from 'react'
import { Box, Text } from 'utils/theme'

export const ToggleButton = ({ children }: { children: string }) => (
  <Box
    height={37}
    paddingHorizontal="m"
    marginRight="s"
    marginTop="s"
    backgroundColor="grayToggleButton"
    justifyContent="center"
    alignItems="center"
    borderRadius="l">
    <Text variant="textSM">{children}</Text>
  </Box>
)
