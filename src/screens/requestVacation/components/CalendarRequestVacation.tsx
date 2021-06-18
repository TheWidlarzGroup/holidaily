import React from 'react'
import { Calendar } from 'react-native-calendars'

import { Box, mkUseStyles, Text } from 'utils/theme'
import { SelectPeriodModal } from './SelectPeriodModal'

export const CalendarRequestVacation = () => {
  const styles = useStyles()

  return (
    <Box backgroundColor="lightGrey" borderRadius="m" flex={1}>
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
      <Calendar
        markedDates={{}}
        markingType={'period'}
        style={styles.calendar}
        renderHeader={renderHeader}
      />
      <Calendar
        markedDates={{}}
        markingType={'period'}
        style={styles.calendar}
        renderHeader={renderHeader}
      />
      <SelectPeriodModal isVisible={true} hideModal={() => {}} />
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  selectModal: {
    height: 40,
  },
  calendar: {
    flex: 1,
    height: 400,
  },
}))

const renderHeader = (date: Date) => {
  return <Text variant="body1Bold">{date.toString().slice(4, 7)}</Text>
}
