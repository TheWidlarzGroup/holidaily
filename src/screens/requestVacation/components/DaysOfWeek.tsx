import React from 'react'

import { Box, mkUseStyles, Text } from 'utils/theme'

export const DaysOfWeek = () => {
  const styles = useStyles()

  return (
    <Box
      flexDirection="row"
      justifyContent="space-around"
      backgroundColor="lightGrey"
      paddingHorizontal="l"
      style={styles.dayNames}
      paddingVertical="m">
      <Text variant="remind1">M</Text>
      <Text variant="remind1">T</Text>
      <Text variant="remind1">W</Text>
      <Text variant="remind1">T</Text>
      <Text variant="remind1">F</Text>
      <Text variant="remind1">S</Text>
      <Text variant="remind1">S</Text>
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  dayNames: {
    width: '100%',
  },
}))
