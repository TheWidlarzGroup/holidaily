import React from 'react'
import { StyleSheet } from 'react-native'
import { CalendarList } from 'react-native-calendars'

import { Box, Text, theme } from 'utils/theme'

type CalendarRequestVacationProps = {}

export const CalendarRequestVacation = ({}: CalendarRequestVacationProps) => {
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
      <CalendarList
        markedDates={{
          '2021-06-22': { selected: true, startingDay: true, color: theme.colors.primary },
          '2021-06-23': { selected: true, color: theme.colors.primary },
          '2021-06-24': { selected: true, color: theme.colors.primary },
          '2021-06-25': { selected: true, endingDay: true, color: theme.colors.primary },
        }}
        markingType={'period'}
      />
      <Box style={styles.selectModal}>
        <Text>22 Jun - 15 Jun</Text>
        <Text>(4 days of PTO)</Text>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  selectModal: {
    height: 40,
    backgroundColor: 'red',
  },
})
