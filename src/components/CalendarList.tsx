import React from 'react'
import { CalendarProps as RNCalendarProps, DateObject, LocaleConfig } from 'react-native-calendars'
import { CalendarDay } from 'components/CalendarComponents/CalendarDay'
import { isWeekendOrHoliday } from 'poland-public-holidays'
import { Theme, useTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { getISODateString, getShortWeekDays } from 'utils/dates'
import { genMarkedDates, MarkedDateType } from 'utils/genMarkedDates'
import { useCalendarPeriodStyles } from 'hooks/style-hooks/useCalendarStyles'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { eachDayOfInterval, isPast } from 'date-fns'
import { isToday } from 'date-fns/esm'
import { DayOffRequest } from 'mockApi/models'
import {
  MarkingType,
  NewCalendarBaseProps,
  NewDayComponentProps,
} from './CalendarComponents/CalendarTypes'
import { NewCalendarList } from './CalendarComponents/NewCalendar'
import type { Dot } from './ExpandableCalendar'

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
  const appTheme = useTheme()
  const { user } = useUserContext()
  const userRequestDots = user ? mkUserRequestDots(user.requests, user.userColor) : []
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

  const calendarMarkedDates = {
    ...markedDates,
    ...genMarkedDates(p.periodStart, p.periodEnd, p.isInvalid, {
      dotMarking: { dates: userRequestDots },
    }),
  }
  const calendarTheme = mkCalendarTheme(appTheme, themeProp)

  return (
    <NewCalendarList
      pastScrollRange={0}
      futureScrollRange={24}
      firstDay={1}
      hideExtraDays
      hideArrows
      theme={calendarTheme}
      dayComponent={CalendarDayComponent}
      markingType="period"
      onDayPress={handleClick}
      renderHeader={renderHeader}
      markedDates={calendarMarkedDates}
      {...p}
    />
  )
}

const mkUserRequestDots = (requests: DayOffRequest[], userColor: string) => {
  const userRequestsDates: string[] = []
  requests.forEach((req) => {
    if (req.status === 'cancelled') return
    const eachDayOfReq = eachDayOfInterval({
      start: new Date(req.startDate),
      end: new Date(req.endDate),
    })
      .filter((date) => !isWeekendOrHoliday(date))
      .map((date) => getISODateString(date))
    userRequestsDates.push(...eachDayOfReq)
  })
  const userRequestDots: Dot[] = userRequestsDates.map((date) => ({
    key: date,
    color: userColor,
  }))
  return userRequestDots
}

const mkCalendarTheme = (
  appTheme: Theme,
  themeProp: RNCalendarProps['theme']
): NewCalendarBaseProps['theme'] => ({
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
})

const renderHeader = (date: Date) => <CalendarHeader ignoreDarkmode date={date} />
const CalendarDayComponent = React.memo(
  (props: NewDayComponentProps & { marking: MarkedDateType }) => {
    const isPastDate = !isToday(props.date.timestamp) && isPast(props.date.timestamp)
    const { validPeriodStyles, invalidPeriodStyles } = useCalendarPeriodStyles()
    return (
      <CalendarDay
        {...props}
        dayHeight={24}
        dayWidth={37}
        marking={{
          ...(props.marking ?? {}),
          disabled: isPastDate || props.marking?.disabled,
        }}
        ignoreDarkMode
        styles={props.marking?.isInvalid ? invalidPeriodStyles : validPeriodStyles}
      />
    )
  },
  (prevProps, nextProps) => {
    if ((prevProps.marking?.dots ?? []).length !== (nextProps.marking?.dots ?? []).length)
      return false
    if (!prevProps.marking?.period && !nextProps.marking?.period) return true
    return false
  }
)
