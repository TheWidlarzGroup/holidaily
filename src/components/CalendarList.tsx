import React, { useState, useEffect, useCallback } from 'react'
import { CalendarProps as RNCalendarProps, DateObject, LocaleConfig } from 'react-native-calendars'
import { CalendarDay } from 'components/CalendarComponents/CalendarDay'
import { useTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { getShortWeekDays } from 'utils/dates'
import { genMarkedDates } from 'utils/genMarkedDates'
import { useCalendarPeriodStyles } from 'hooks/useCalendarStyles'
import { MarkingType, NewCalendarBaseProps } from './CalendarComponents/CalendarTypes'
import { NewCalendarList } from './CalendarComponents/NewCalendar'

type CustomCalendarProps = {
  markedDates: MarkingType | Record<string, never>
  onSelectedPeriodChange?: F2<string | undefined, string | undefined>
  selectable?: boolean
  onHeaderPressed?: F0
  isInvalid?: boolean
}

export const CalendarList = ({
  theme: themeProp,
  onSelectedPeriodChange,
  selectable = false,
  markedDates,
  isInvalid,
  ...props
}: CustomCalendarProps & RNCalendarProps) => {
  const [selectedPeriodStart, setSelectedPeriodStart] = useState<string | undefined>()
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState<string | undefined>()
  const { validPeriodStyles, invalidPeriodStyles } = useCalendarPeriodStyles()
  const appTheme = useTheme()
  useEffect(() => {
    if (!onSelectedPeriodChange) return
    onSelectedPeriodChange(selectedPeriodStart, selectedPeriodEnd)
  }, [onSelectedPeriodChange, selectedPeriodStart, selectedPeriodEnd])

  const handleClick = ({ dateString: clickedDate }: DateObject) => {
    if (!selectable) return
    if (!selectedPeriodStart || !selectedPeriodEnd || selectedPeriodStart !== selectedPeriodEnd) {
      setSelectedPeriodStart(clickedDate)
      setSelectedPeriodEnd(clickedDate)
      return
    }

    if (clickedDate < selectedPeriodStart) setSelectedPeriodStart(clickedDate)
    if (clickedDate > selectedPeriodEnd) setSelectedPeriodEnd(clickedDate)
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
        (props) => (
          <CalendarDay {...props} styles={isInvalid ? invalidPeriodStyles : validPeriodStyles} />
        ),
        [isInvalid, invalidPeriodStyles, validPeriodStyles]
      )}
      markingType={'period'}
      onDayPress={handleClick}
      renderHeader={useCallback(
        (date: Date) => (
          <CalendarHeader date={date} />
        ),
        []
      )}
      markedDates={{
        ...markedDates,
        ...genMarkedDates(selectedPeriodStart, selectedPeriodEnd),
      }}
      calendarHeight={410}
      {...props}
    />
  )
}
