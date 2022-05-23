import { useNavigation } from '@react-navigation/native'
import { CalendarList } from 'components/CalendarList'
import { LoadingModal } from 'components/LoadingModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
import { ModalNavigationProps, ModalNavigationType } from 'navigation/types'
import React, { useEffect, useMemo, useState } from 'react'
import { calculatePTO } from 'utils/dates'
import { BaseOpacity, Box, mkUseStyles } from 'utils/theme'
import { CalendarHeader } from './CalendarHeader'
import { MaxSickdays, MAX_SICK_DAYS_COUNT } from './MaxSickDays'
import { SelectPeriodModal } from './SelectPeriodModal'

export const CalendarRequestVacation = ({
  route: {
    params: { isSickTime },
  },
}: ModalNavigationProps<'RequestVacationCalendar'>) => {
  const [periodStart, selectPeriodStart] = useState<string>('')
  const [periodEnd, selectPeriodEnd] = useState<string>('')
  const { goBack } = useNavigation()
  const { user } = useUserContext()
  const availablePto = useMemo(() => user?.availablePto ?? 0, [user])
  const ptoTaken = useMemo(() => {
    if (!periodEnd || !periodStart) return 0
    return calculatePTO(periodStart, periodEnd)
  }, [periodStart, periodEnd])
  const isInvalid = isSickTime ? ptoTaken > MAX_SICK_DAYS_COUNT : ptoTaken > availablePto
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
  // Calendar component draw phase takes long, so we initially show a loading spinner and mount the calendar after the screen is loaded
  const [isCalendarVisible, { setTrue: showCalendar }] = useBooleanState(false)
  useEffect(() => {
    showCalendar()
  }, [showCalendar])
  const styles = useStyles()

  return (
    <Box flex={1} paddingTop="m">
      <BaseOpacity onPress={goBack} position="absolute" width="100%" height="100%" top={0} />
      <Box
        style={styles.container}
        borderRadius="m"
        flex={1}
        alignItems="center"
        marginTop="xxxl"
        borderTopLeftRadius="l2min"
        borderTopRightRadius="l2min">
        <LoadingModal style={styles.loadingSpinneer} show={!isCalendarVisible} />
        {isCalendarVisible && (
          <>
            <CalendarList
              periodStart={periodStart}
              periodEnd={periodEnd}
              selectPeriodStart={selectPeriodStart}
              selectPeriodEnd={selectPeriodEnd}
              selectable
              disablePastDates
              style={styles.calendar}
              renderHeader={(date: Date) => <CalendarHeader date={date} />}
              markedDates={{}}
              isInvalid={isInvalid}
            />
            <SelectPeriodModal
              isVisible={!!periodStart}
              onSubmit={onSubmit}
              onClear={onClear}
              periodStart={periodStart}
              periodEnd={periodEnd}
              ptoTaken={ptoTaken}
              availablePto={availablePto}
              isInvalid={isInvalid}
              customError={isSickTime ? <MaxSickdays /> : null}
            />
          </>
        )}
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  selectModal: {
    height: 40,
  },
  calendar: {
    width: 318,
    marginTop: theme.spacing.s,
  },
  dayNames: {
    width: '100%',
  },
  loadingSpinneer: {
    backgroundColor: theme.colors.transparent,
  },
  // Comment: Not using theme.colors.white / alwaysWhite because newCalendarList has #fff background, and idk where it comes from
  container: {
    backgroundColor: '#fff',
  },
}))
