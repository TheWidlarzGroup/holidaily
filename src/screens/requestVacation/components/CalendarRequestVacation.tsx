import { useNavigation } from '@react-navigation/native'
import { CalendarList } from 'components/CalendarList'
import { LoadingModal } from 'components/LoadingModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { ModalNavigationProps, AppNavigationType } from 'navigation/types'
import React, { useEffect, useState } from 'react'
import { calculatePTO, getDurationInDays, getFormattedPeriod } from 'utils/dates'
import { mkUseStyles } from 'utils/theme'
import { ActionModal } from 'components/ActionModal'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { TFunction, useTranslation } from 'react-i18next'
import { MAX_SICK_DAYS_COUNT } from './MaxSickDays'

type GetPeriodModalTextsProps = {
  haveUserPickedPeriod: boolean
  periodStart: string
  periodEnd: string
  ptoTaken: number
  isInvalid: boolean
  isSickTime?: boolean
  availablePto: number
  tFunc: TFunction<'requestVacation'>
}

const getPeriodModalTexts = (p: GetPeriodModalTextsProps): { header: string; content: string } => {
  if (!p.haveUserPickedPeriod) return { header: '', content: '' }
  if (p.isInvalid && p.isSickTime)
    return { header: p.tFunc('maxSickdaysError', { maxDays: MAX_SICK_DAYS_COUNT }), content: '' }
  if (p.isInvalid && p.availablePto < 1)
    return {
      header: p.tFunc('noPtoAvailable'),
      content: '',
    }
  if (p.isInvalid)
    return {
      header: p.tFunc('notEnoughPto'),
      content: p.tFunc('availablePto', { availablePto: getDurationInDays(p.availablePto) }),
    }
  return {
    header: getFormattedPeriod(new Date(p.periodStart), new Date(p.periodEnd)),
    content: p.tFunc('pickedPTO', { days: getDurationInDays(p.ptoTaken) }),
  }
}

export const CalendarRequestVacation = ({
  route: {
    params: { isSickTime },
  },
}: ModalNavigationProps<'REQUEST_VACATION_CALENDAR'>) => {
  const [periodStart, selectPeriodStart] = useState<string>('')
  const [periodEnd, selectPeriodEnd] = useState<string>('')
  const { user } = useUserContext()
  const { t } = useTranslation('requestVacation')
  const haveUserPickedPeriod = !!periodStart && !!periodEnd
  const availablePto = user?.availablePto ?? 0
  const ptoTaken = haveUserPickedPeriod ? calculatePTO(periodStart, periodEnd) : 0
  const isInvalid = isSickTime ? ptoTaken > MAX_SICK_DAYS_COUNT : ptoTaken > availablePto
  const navigation = useNavigation<AppNavigationType<'REQUEST_VACATION_CALENDAR'>>()
  const onClear = () => {
    selectPeriodStart('')
    selectPeriodEnd('')
  }
  const onSubmit = () =>
    navigation.navigate('REQUEST_VACATION', {
      start: periodStart,
      end: periodEnd,
    })

  const onModalBtnPress = isInvalid ? onClear : onSubmit

  const actionModalTexts = getPeriodModalTexts({
    isInvalid,
    isSickTime,
    periodEnd,
    periodStart,
    haveUserPickedPeriod,
    ptoTaken,
    availablePto,
    tFunc: t,
  })
  const actionModalVariant = isInvalid ? 'error' : 'regular'
  // Calendar component draw phase takes long, so we initially show a loading spinner and mount the calendar after the screen is loaded
  const [isCalendarVisible, { setTrue: showCalendar }] = useBooleanState(false)
  useEffect(showCalendar, [showCalendar])
  const styles = useStyles()

  return (
    <SwipeableScreen swipeWithIndicator alignItems="center" extraStyle={styles.container}>
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
            markedDates={{}}
            isInvalid={isInvalid}
          />
          <ActionModal
            isVisible={!!periodStart}
            onUserAction={onModalBtnPress}
            label={isInvalid ? t('clear') : t('select')}
            variant={actionModalVariant}
            header={actionModalTexts.header}
            content={actionModalTexts.content}
          />
        </>
      )}
    </SwipeableScreen>
  )
}

const useStyles = mkUseStyles((theme) => ({
  selectModal: {
    height: 40,
  },
  calendar: {
    width: 400,
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
