import React, { useState, useEffect } from 'react'
import {
  CalendarList as RNCalendarList,
  Calendar as RNCalendar,
  CalendarProps as RNCalendarProps,
  LocaleConfig,
} from 'react-native-calendars'
import { CalendarDay } from 'components/CalendarComponents/CalendarDay'
import { theme as appTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { getShortWeekDays } from 'utils/dates'
import { useTranslation } from 'react-i18next'
import { genMarkedDates } from 'utils/genMarkedDates'

type ClickProps = {
  dateString: string
  timestamp: number
  day: number
  month: number
  year: number
}

type CustomCalendarProps = {
  onSelectedPeriodChange?: F2<string, string>
  selectable?: boolean
  list?: boolean
  onHeaderPressed?: F0
}

export const Calendar = React.forwardRef(
  (
    {
      theme: themeProp,
      onSelectedPeriodChange,
      selectable = false,
      onHeaderPressed,
      list = false,
      markedDates = {},
      ...props
    }: RNCalendarProps & CustomCalendarProps,
    ref: RNCalendar
  ) => {
    const [selectedPeriodStart, setSelectedPeriodStart] = useState<string | undefined>()
    const [selectedPeriodEnd, setSelectedPeriodEnd] = useState<string | undefined>()

    useEffect(() => {
      if (!onSelectedPeriodChange) return
      onSelectedPeriodChange(selectedPeriodStart, setSelectedPeriodEnd)
    }, [onSelectedPeriodChange, selectedPeriodStart, selectedPeriodEnd])

    const handleClick = ({ dateString: clickedDate }: ClickProps) => {
      if (!selectable) return
      if (!selectedPeriodStart || !selectedPeriodEnd || selectedPeriodStart !== selectedPeriodEnd) {
        setSelectedPeriodStart(clickedDate)
        setSelectedPeriodEnd(clickedDate)
        return
      }

      if (clickedDate < selectedPeriodStart) setSelectedPeriodStart(clickedDate)
      if (clickedDate > selectedPeriodEnd) setSelectedPeriodEnd(clickedDate)
    }

    const { i18n } = useTranslation()
    LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = getShortWeekDays(i18n.language)

    const theme = {
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
      },
      ...themeProp,
    }

    if (!list)
      return (
        <RNCalendar
          firstDay={1}
          hideExtraDays
          theme={theme}
          dayComponent={CalendarDay}
          onDayPress={handleClick}
          renderHeader={(date: Date) => (
            <CalendarHeader date={date} onHeaderPressed={onHeaderPressed} />
          )}
          markedDates={{
            ...markedDates,
            ...genMarkedDates(selectedPeriodStart, selectedPeriodEnd),
          }}
          ref={ref}
          {...props}
        />
      )

    return (
      <RNCalendarList
        pastScrollRange={0}
        futureScrollRange={24}
        firstDay={1}
        hideExtraDays
        hideArrows
        hideDayNames
        theme={theme}
        dayComponent={CalendarDay}
        onDayPress={handleClick}
        renderHeader={(date: Date) => <CalendarHeader date={date} />}
        markedDates={{
          ...markedDates,
          ...genMarkedDates(selectedPeriodStart, selectedPeriodEnd),
        }}
        {...props}
      />
    )
  }
)
Calendar.displayName = 'Calendar'
