import React from 'react'
import { Box, useTheme } from 'utils/theme'
import PlaneIcon from 'assets/icons/icon-paperplane-large.svg'

export const RequestSentImage = () => {
  const theme = useTheme()
  return (
    <Box
      height={106}
      width={106}
      borderRadius="full"
      bg="black"
      margin="l"
      alignItems="center"
      justifyContent="center">
      <PlaneIcon color={theme.colors.white} />
    </Box>
  )
}
