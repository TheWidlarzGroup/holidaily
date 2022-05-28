import React from 'react'
import { CalendarProps as RNCalendarProps, DateObject, LocaleConfig } from 'react-native-calendars'
import { CalendarDay } from 'components/CalendarComponents/CalendarDay'
import { useTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { getShortWeekDays } from 'utils/dates'
import { genCalendarListMarkedDates, MarkedDateType } from 'utils/calendarUtils'
import { useCalendarPeriodStyles } from 'hooks/useCalendarStyles'
import { useCalendarData } from 'screens/calendar/useCalendarData'
import { isPast } from 'date-fns'
import { isToday } from 'date-fns/esm'
import {
  MarkingType,
  NewCalendarBaseProps,
  NewDayComponentProps,
} from './CalendarComponents/CalendarTypes'
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
  const appTheme = useTheme()

  const { currentMonthDays, setSelectedDate } = useCalendarData()
  const onVisibleMonthChange = (d: DateObject[]) => setSelectedDate(new Date(d[0].timestamp))
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
  const calendarMarkedDates = {
    ...markedDates,
    ...genCalendarListMarkedDates({
      start: p.periodStart,
      end: p.periodEnd,
      isInvalid: p.isInvalid,
      days: currentMonthDays,
    }),
  }
  return (
    <NewCalendarList
      pastScrollRange={0}
      futureScrollRange={24}
      firstDay={1}
      hideExtraDays
      hideArrows
      theme={theme}
      dayComponent={CalendarDayComponent}
      onVisibleMonthsChange={onVisibleMonthChange}
      markingType="multi-dot"
      onDayPress={handleClick}
      renderHeader={renderHeader}
      markedDates={calendarMarkedDates}
      {...p}
    />
  )
}
const renderHeader = (date: Date) => <CalendarHeader ignoreDarkmode date={date} />
const CalendarDayComponent = React.memo(
  (props: NewDayComponentProps & { marking: MarkedDateType }) => {
    console.log(props)
    const isPastDate = () => !isToday(props.date.timestamp) && isPast(props.date.timestamp)
    const { validPeriodStyles, invalidPeriodStyles } = useCalendarPeriodStyles()
    return (
      <CalendarDay
        {...props}
        marking={{
          ...(props.marking ?? {}),
          disabled: props.marking?.disabled || isPastDate(),
        }}
        ignoreDarkMode
        styles={props.marking?.isInvalid ? invalidPeriodStyles : validPeriodStyles}
      />
    )
  },
  (prevProps, nextProps) => {
    if (!prevProps.marking?.period && !nextProps.marking?.period) return true
    return false
  }
)
