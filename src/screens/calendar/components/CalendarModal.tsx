import { useNavigation } from '@react-navigation/native'
import { CalendarList } from 'components/CalendarList'
import { LoadingModal } from 'components/LoadingModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { CalendarNavigatorType } from 'navigation/types'
import React, { useEffect, useMemo } from 'react'
import { calculatePTO, getDurationInDays, getFormattedPeriod } from 'utils/dates'
import { mkUseStyles } from 'utils/theme'
import { ActionModal } from 'components/ActionModal'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { TFunction, useTranslation } from 'react-i18next'
import { useCalendarContext } from 'hooks/context-hooks/useCalendarContext'
import { useCalendarData } from '../useCalendarData'
import { getMarkedDates } from '../utils'

const getActionModalHeaderText = (
  periodStart: string,
  periodEnd: string,
  t: TFunction<'calendar'>,
  language: string
) => {
  if (periodStart?.length < 10 || periodEnd?.length < 10) return ''

  const withOneBeforeText = language === 'en' ? '' : 1

  if (periodStart === periodEnd)
    return `${withOneBeforeText} ${getDurationInDays(1)} ${t('singleDayOutOfOffice')}`

  return `${getDurationInDays(calculatePTO(periodStart, periodEnd))} ${t('outOfOffice')}`
}

const getActionModalTitle = (periodStart: string, periodEnd: string) => {
  if (periodStart.length < 10 || periodEnd.length < 10) return ''

  return getFormattedPeriod(periodStart, periodEnd)
}

export const CalendarModal = () => {
  const { periodStart, periodEnd, handleSetPeriodStart, handleSetPeriodEnd } = useCalendarContext()
  const { requestsDays } = useCalendarData()

  const markedDates = useMemo(() => getMarkedDates(requestsDays), [requestsDays])

  const { t, i18n } = useTranslation('calendar')

  const navigation = useNavigation<CalendarNavigatorType<'CALENDAR_MODAL'>>()

  const onSubmit = () => navigation.navigate('CALENDAR')

  const actionModalVariant = 'regular'
  // Calendar component draw phase takes long, so we initially show a loading spinner and mount the calendar after the screen is loaded
  const [isCalendarVisible, { setTrue: showCalendar }] = useBooleanState(false)
  useEffect(showCalendar, [showCalendar])
  const styles = useStyles()

  return (
    <SwipeableScreen
      swipeWithIndicator
      alignItems="center"
      extraStyle={styles.container}
      withBackIcon>
      <LoadingModal style={styles.loadingSpinner} show={!isCalendarVisible} />
      {isCalendarVisible && (
        <>
          <CalendarList
            periodStart={periodStart}
            periodEnd={periodEnd}
            selectPeriodStart={handleSetPeriodStart}
            selectPeriodEnd={handleSetPeriodEnd}
            selectable
            style={styles.calendar}
            markedDates={markedDates}
            current={periodStart}
            pastScrollRange={12}
            futureScrollRange={12}
            disablePastDates={false}
          />
          <ActionModal
            isVisible={!!periodStart}
            onUserAction={onSubmit}
            label={t('select')}
            variant={actionModalVariant}
            header={getActionModalTitle(periodStart, periodEnd)}
            content={getActionModalHeaderText(periodStart, periodEnd, t, i18n.language)}
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
  loadingSpinner: {
    backgroundColor: theme.colors.transparent,
  },
  // Comment: Not using theme.colors.white / alwaysWhite because newCalendarList has #fff background, and idk where it comes from
  container: {
    backgroundColor: theme.colors.white,
  },
}))
