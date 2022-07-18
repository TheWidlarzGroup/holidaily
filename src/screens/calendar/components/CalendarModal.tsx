import { useNavigation } from '@react-navigation/native'
import { CalendarList } from 'components/CalendarList'
import { LoadingModal } from 'components/LoadingModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { AppNavigationType } from 'navigation/types'
import React, { useEffect } from 'react'
import { calculatePTO, getDurationInDays, getFormattedPeriod } from 'utils/dates'
import { mkUseStyles } from 'utils/theme'
import { ActionModal, ActionModalProps } from 'components/ActionModal'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { drawnDayoffInAlreadyScheduledTime } from 'utils/dayOffUtils'
import { TFunction, useTranslation } from 'react-i18next'
import { useCalendarContext } from 'hooks/context-hooks/useCalendarContext'

type GetPeriodModalTextsProps = {
  periodStart: string
  periodEnd: string
  ptoTaken: number
  availablePto: number
  tFunc: TFunction<'requestVacation'>
}

export const CalendarModal = () => {
  const { periodStart, periodEnd, handleSetPeriodStart, handleSetPeriodEnd } = useCalendarContext()

  const { user } = useUserContext()
  const { t } = useTranslation('requestVacation')
  const haveUserPickedPeriod = !!periodStart && !!periodEnd
  const availablePto = user?.availablePto ?? 0
  const ptoTaken = haveUserPickedPeriod ? calculatePTO(periodStart, periodEnd) : 0
  const periodState: keyof ReturnType<typeof mkModalTexts> = (() => {
    const alreadyScheduledPeriod =
      user?.requests &&
      periodStart &&
      periodEnd &&
      drawnDayoffInAlreadyScheduledTime(
        { startDate: periodStart, endDate: periodEnd },
        user.requests
      )

    if (alreadyScheduledPeriod) return 'alreadyScheduledPeriod'

    return 'valid'
  })()
  const navigation = useNavigation<AppNavigationType<'REQUEST_VACATION_CALENDAR'>>()

  const onClear = () => {
    handleSetPeriodStart('')
    handleSetPeriodEnd('')
  }

  const onSubmit = () => navigation.navigate('Calendar')

  const isPeriodValid = periodState === 'valid'
  const isPeriodAlreadyScheduled = periodState === 'alreadyScheduledPeriod'
  const onModalBtnPress = isPeriodValid ? onSubmit : onClear
  const actionModalVariant = isPeriodValid ? 'regular' : 'error'
  // Calendar component draw phase takes long, so we initially show a loading spinner and mount the calendar after the screen is loaded
  const [isCalendarVisible, { setTrue: showCalendar }] = useBooleanState(false)
  useEffect(showCalendar, [showCalendar])
  const styles = useStyles()
  const modalTexts = mkModalTexts({ periodStart, periodEnd, ptoTaken, availablePto, tFunc: t })

  const modalExtraButtons: ActionModalProps['extraButtons'] = isPeriodAlreadyScheduled
    ? [
        {
          label: t('drop'),
          onPress: () => {
            navigation.goBack()
            navigation.goBack()
          },
        },
      ]
    : undefined

  return (
    <SwipeableScreen swipeWithIndicator alignItems="center" extraStyle={styles.container}>
      <LoadingModal style={styles.loadingSpinner} show={!isCalendarVisible} />
      {isCalendarVisible && (
        <>
          <CalendarList
            periodStart={periodStart}
            periodEnd={periodEnd}
            selectPeriodStart={handleSetPeriodStart}
            selectPeriodEnd={handleSetPeriodEnd}
            selectable
            disablePastDates
            style={styles.calendar}
            markedDates={{}}
            // isInvalid={!isPeriodValid}
          />
          <ActionModal
            isVisible={!!periodStart}
            onUserAction={onModalBtnPress}
            label={modalTexts[periodState].btnText}
            variant={actionModalVariant}
            header={modalTexts[periodState].header}
            content={modalTexts[periodState].content}
            extraButtons={modalExtraButtons}
            // extraStyle={{ paddingBottom: isIos ? 40 : 20 }}
          />
        </>
      )}
    </SwipeableScreen>
  )
}

const mkModalTexts = (p: GetPeriodModalTextsProps) => ({
  valid: {
    header:
      p.periodStart &&
      p.periodEnd &&
      getFormattedPeriod(new Date(p.periodStart), new Date(p.periodEnd)),
    content: p.tFunc('pickedPTO', { days: getDurationInDays(p.ptoTaken) }),
    btnText: p.tFunc('select'),
  },
  tooLongSicktime: {
    // header: p.tFunc('maxSickDays', { maxDays: MAX_SICK_DAYS_COUNT }),
    content: '',
    btnText: p.tFunc('clear'),
  },
  notEnoughPto: {
    header: p.tFunc('notEnoughPto'),
    content: p.tFunc('availablePto', { availablePto: getDurationInDays(p.availablePto) }),
    btnText: p.tFunc('clear'),
  },
  noPtoAtAll: {
    header: p.tFunc('noPtoAvailable'),
    content: '',
    btnText: p.tFunc('clear'),
  },
  alreadyScheduledPeriod: {
    header: p.tFunc('alreadyScheduledHeader'),
    content: p.tFunc('alreadyScheduledContent'),
    btnText: p.tFunc('change'),
  },
})

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
  loadingSpinner: {
    backgroundColor: theme.colors.transparent,
  },
  // Comment: Not using theme.colors.white / alwaysWhite because newCalendarList has #fff background, and idk where it comes from
  container: {
    backgroundColor: theme.colors.white,
  },
}))
