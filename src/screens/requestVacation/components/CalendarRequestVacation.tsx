import { useNavigation } from '@react-navigation/native'
import { CalendarList } from 'components/CalendarList'
import { useUserContext } from 'hooks/useUserContext'
import { ModalNavigationProps, ModalNavigationType } from 'navigation/types'
import React, { useMemo, useState } from 'react'
import { calculatePTO } from 'utils/dates'
import { Box, mkUseStyles } from 'utils/theme'
import { CalendarHeader } from './CalendarHeader'
import { SelectPeriodModal } from './SelectPeriodModal'

export const CalendarRequestVacation = ({
  route: {
    params: { isSickTime },
  },
}: ModalNavigationProps<'RequestVacationCalendar'>) => {
  const [selectedPeriodStart, setSelectedPeriodStart] = useState<string>('')
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState<string>('')
  const { user } = useUserContext()
  const availablePto = useMemo(() => user?.availablePto ?? 0, [user])
  const ptoTaken = useMemo(() => {
    if (isSickTime || !selectedPeriodEnd || !selectedPeriodStart) return 0
    return calculatePTO(selectedPeriodStart, selectedPeriodEnd)
  }, [selectedPeriodStart, selectedPeriodEnd, isSickTime])
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
        isInvalid={availablePto < ptoTaken}
      />

      <SelectPeriodModal
        isVisible={!!selectedPeriodStart}
        onSubmit={handleSubmit}
        periodStart={selectedPeriodStart}
        periodEnd={selectedPeriodEnd}
        ptoTaken={ptoTaken}
        availablePto={availablePto}
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
