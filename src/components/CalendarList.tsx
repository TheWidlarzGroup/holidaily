import React, { useCallback } from 'react'
import { CalendarProps as RNCalendarProps, DateObject, LocaleConfig } from 'react-native-calendars'
import { CalendarDay } from 'components/CalendarComponents/CalendarDay'
import { useTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { getShortWeekDays } from 'utils/dates'
import { genMarkedDates } from 'utils/genMarkedDates'
import { useCalendarPeriodStyles } from 'hooks/useCalendarStyles'
import { isPast } from 'date-fns'
import { isToday } from 'date-fns/esm'
import { MarkingType, NewCalendarBaseProps } from './CalendarComponents/CalendarTypes'
import { NewCalendarList } from './CalendarComponents/NewCalendar'

type CustomCalendarProps = {
  markedDates: MarkingType | Record<string, never>
  periodStart: string | undefined
  periodEnd: string | undefined
  selectPeriodStart: F1<string>
  selectPeriodEnd: F1<string>
  selectable?: boolean
  onHeaderPressed?: F0
  isInvalid?: boolean
  disablePastDates?: boolean
}

export const CalendarList = ({
  theme: themeProp,
  selectable = false,
  markedDates,
  ...p
}: CustomCalendarProps & RNCalendarProps) => {
  const { validPeriodStyles, invalidPeriodStyles } = useCalendarPeriodStyles()
  const appTheme = useTheme()

  const handleClick = ({ dateString: clickedDate }: DateObject) => {
    if (!selectable) return
    if (!p.periodStart || !p.periodEnd || p.periodStart !== p.periodEnd) {
      p.selectPeriodStart(clickedDate)
      p.selectPeriodEnd(clickedDate)
      return
    }

    if (clickedDate < p.periodStart) p.selectPeriodStart(clickedDate)
    if (clickedDate > p.periodEnd) p.selectPeriodEnd(clickedDate)
  }
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = getShortWeekDays()

  const theme: NewCalendarBaseProps['theme'] = {
    textDayFontFamily: appTheme.fontFamily.nunitoRegular,
    textDayFontSize: appTheme.fontSize.xs,
    textSectionTitleColor: appTheme.colors.grey,
    arrowColor: appTheme.colors.black,
    'stylesheet.calendar.header': {
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 6,
        alignItems: 'center',
        marginBottom: 10,
      },
    } as const,
    ...themeProp,
  }

  return (
    <NewCalendarList
      pastScrollRange={0}
      futureScrollRange={24}
      firstDay={1}
      hideExtraDays
      hideArrows
      theme={theme}
      dayComponent={useCallback(
        (props) => {
          const date = new Date(props.date.dateString)
          const disabledBecauseIsPast = p.disablePastDates && !isToday(date) && isPast(date)
          return (
            <CalendarDay
              {...props}
              marking={{
                ...(props.marking ?? {}),
                disabled: disabledBecauseIsPast || props.marking?.disabled,
              }}
              dayTextColor="alwaysBlack"
              styles={p.isInvalid ? invalidPeriodStyles : validPeriodStyles}
            />
          )
        },
        [p.isInvalid, invalidPeriodStyles, validPeriodStyles, p.disablePastDates]
      )}
      markingType="period"
      onDayPress={handleClick}
      renderHeader={useCallback(
        (date: Date) => (
          <CalendarHeader date={date} />
        ),
        []
      )}
      markedDates={{
        ...markedDates,
        ...genMarkedDates(p.periodStart, p.periodEnd),
      }}
      {...p}
    />
  )
}
