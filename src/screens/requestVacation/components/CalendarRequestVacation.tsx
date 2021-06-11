import React from 'react'
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
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        markingType={'period'}
      />
    </Box>
  )
}

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' }
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' }
const workout = { key: 'workout', color: 'green' }
