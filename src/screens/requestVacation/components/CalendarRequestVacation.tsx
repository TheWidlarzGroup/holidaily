import { useNavigation } from '@react-navigation/native'
import { CalendarList } from 'components/CalendarList'
import { ModalNavigationType } from 'navigation/types'
import React, { useState } from 'react'

import { Box, mkUseStyles } from 'utils/theme'
import { CalendarHeader } from './CalendarHeader'
import { SelectPeriodModal } from './SelectPeriodModal'

export const CalendarRequestVacation = () => {
  const [selectedPeriodStart, setSelectedPeriodStart] = useState<string>('')
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState<string>('')

  const navigation = useNavigation<ModalNavigationType<'RequestVacationCalendar'>>()

  const handleSelectionChange = (a?: string, b?: string) => {
    setSelectedPeriodStart(a || '')
    setSelectedPeriodEnd(b || '')
  }

  const handleSubmit = () =>
    navigation.navigate('RequestVacation', {
      start: selectedPeriodStart,
      end: selectedPeriodEnd,
    })

  const styles = useStyles()

  return (
    <Box backgroundColor="white" borderRadius="m" flex={1} alignItems="center">
      <CalendarList
        selectable
        style={styles.calendar}
        renderHeader={(date: Date) => <CalendarHeader date={date} />}
        onSelectedPeriodChange={handleSelectionChange}
        markedDates={{}}
      />
      <SelectPeriodModal
        isVisible={!!selectedPeriodStart}
        onSubmit={handleSubmit}
        periodStart={selectedPeriodStart}
        periodEnd={selectedPeriodEnd}
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
