import React from 'react'
import { Calendar } from 'react-native-calendars'

import { Box, mkUseStyles, Text } from 'utils/theme'

export const CalendarRequestVacation = () => {
  const styles = useStyles()

  return (
    <Box backgroundColor="lightGrey" width="100%" marginTop="l" borderRadius="m">
      <Box
        flexDirection="row"
        justifyContent="space-around"
        paddingVertical="m"
        paddingHorizontal="m">
        <Text color="grey">M</Text>
        <Text color="grey">T</Text>
        <Text color="grey">W</Text>
        <Text color="grey">T</Text>
        <Text color="grey">F</Text>
        <Text color="grey">S</Text>
        <Text color="grey">S</Text>
      </Box>
      <Calendar markedDates={{}} markingType={'period'} />
      <Box style={styles.selectModal}>
        <Text>{}</Text>
        <Text>({} days of PTO)</Text>
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  selectModal: {
    height: 40,
  },
}))
