import { useNavigation } from '@react-navigation/native'
import { CalendarList } from 'components/CalendarList'
import { useUserContext } from 'hooks/useUserContext'
import { ModalNavigationProps, ModalNavigationType } from 'navigation/types'
import React, { useCallback, useMemo, useState } from 'react'
import { calculatePTO } from 'utils/dates'
import { Box, mkUseStyles } from 'utils/theme'
import { CalendarHeader } from './CalendarHeader'
import { SelectPeriodModal } from './SelectPeriodModal'

export const CalendarRequestVacation = ({
  route: {
    params: { isSickTime },
  },
}: ModalNavigationProps<'RequestVacationCalendar'>) => {
  const [periodStart, selectPeriodStart] = useState<string>('')
  const [periodEnd, selectPeriodEnd] = useState<string>('')
  const { user } = useUserContext()
  const availablePto = useMemo(() => user?.availablePto ?? 0, [user])
  const ptoTaken = useMemo(() => {
    if (isSickTime || !periodEnd || !periodStart) return 0
    return calculatePTO(periodStart, periodEnd)
  }, [periodStart, periodEnd, isSickTime])
  const navigation = useNavigation<ModalNavigationType<'RequestVacationCalendar'>>()
  const onClear = () => {
    selectPeriodStart('')
    selectPeriodEnd('')
  }
  const onSubmit = () =>
    navigation.navigate('RequestVacation', {
      start: periodStart,
      end: periodEnd,
    })
  const styles = useStyles()
  return (
    <Box backgroundColor="white" borderRadius="m" flex={1} alignItems="center">
      <CalendarList
        periodStart={periodStart}
        periodEnd={periodEnd}
        selectPeriodStart={selectPeriodStart}
        selectPeriodEnd={selectPeriodEnd}
        selectable
        style={styles.calendar}
        renderHeader={useCallback(
          (date: Date) => (
            <CalendarHeader date={date} />
          ),
          []
        )}
        markedDates={{}}
        isInvalid={availablePto < ptoTaken}
      />
      <SelectPeriodModal
        isVisible={!!periodStart}
        onSubmit={onSubmit}
        onClear={onClear}
        periodStart={periodStart}
        periodEnd={periodEnd}
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
