import React from 'react'
import { CalendarProps as RNCalendarProps, DateObject, LocaleConfig } from 'react-native-calendars'
import { CalendarDay } from 'components/CalendarComponents/CalendarDay'
import { useTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { getShortWeekDays } from 'utils/dates'
import { genMarkedDates, MarkedDateType } from 'utils/genMarkedDates'
import { useCalendarPeriodStyles } from 'hooks/useCalendarStyles'
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
  // TODO: console log days rerenders  BEFORE MERGE
  // const getMarkedDates = useMarkedDates(p.isInvalid)
  return (
    <NewCalendarList
      pastScrollRange={0}
      futureScrollRange={24}
      firstDay={1}
      hideExtraDays
      hideArrows
      theme={theme}
      dayComponent={CalendarDayComponent}
      markingType="period"
      onDayPress={handleClick}
      renderHeader={renderHeader}
      markedDates={{
        ...markedDates,
        ...genMarkedDates(p.periodStart, p.periodEnd, p.isInvalid),
      }}
      {...p}
    />
  )
}
const renderHeader = (date: Date) => <CalendarHeader date={date} />

const CalendarDayComponent = React.memo(
  (props: NewDayComponentProps & { marking: MarkedDateType }) => {
    const isPastDate = !isToday(props.date.timestamp) && isPast(props.date.timestamp)
    const { validPeriodStyles, invalidPeriodStyles } = useCalendarPeriodStyles()
    return (
      <CalendarDay
        {...props}
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
    if (!prevProps.marking?.period && !nextProps.marking?.period) return true
    return false
  }
)
