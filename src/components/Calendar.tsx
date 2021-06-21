import React, { useState, useEffect } from 'react'
import {
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
  onHeaderPressed?: F0
}

export const Calendar = React.forwardRef(
  (
    {
      theme,
      onSelectedPeriodChange,
      selectable = false,
      onHeaderPressed,
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
    return (
      <RNCalendar
        firstDay={1}
        hideExtraDays
        theme={{
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
          ...theme,
        }}
        dayComponent={CalendarDay}
        onDayPress={handleClick}
        renderHeader={(date: Date) => (
          <CalendarHeader date={date} onHeaderPressed={onHeaderPressed} />
        )}
        markedDates={genMarkedDates(selectedPeriodStart, selectedPeriodEnd)}
        ref={ref}
        {...props}
      />
    )
  }
)
Calendar.displayName = 'Calendar'
