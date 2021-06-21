import { useNavigation } from '@react-navigation/core'
import { Calendar } from 'components/Calendar'
import React, { useState } from 'react'

import { Box, mkUseStyles, Text, theme } from 'utils/theme'
import { CalendarHeader } from './CalendarHeader'
import { DaysOfWeek } from './DaysOfWeek'
import { SelectPeriodModal } from './SelectPeriodModal'

export const CalendarRequestVacation = () => {
  const [selectedPeriodStart, setSelectedPeriodStart] = useState<string | undefined>()
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState<string | undefined>()

  const navigation = useNavigation()

  const handleSelectionChange = (a: string, b: string) => {
    setSelectedPeriodStart(a)
    setSelectedPeriodEnd(b)
  }

  const styles = useStyles()

  return (
    <Box backgroundColor="white" borderRadius="m" flex={1} alignItems="center">
      <DaysOfWeek />
      <Calendar
        selectable
        hideArrows
        hideDayNames
        list
        style={styles.calendar}
        renderHeader={(date: Date) => <CalendarHeader date={date} />}
        onSelectedPeriodChange={handleSelectionChange}
      />
      <SelectPeriodModal
        isVisible={!!selectedPeriodStart}
        hideModal={() => navigation.goBack()}
        periodStart={selectedPeriodStart || ''}
        periodEnd={selectedPeriodEnd || ''}
      />
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  selectModal: {
    height: 40,
  },
  calendar: {
    width: 318,
    marginTop: theme.spacing.l,
  },
  dayNames: {
    width: '100%',
  },
}))
