import React, { useState, useEffect } from 'react'
import {
  Calendar as RNCalendar,
  CalendarProps as RNCalendarProps,
  LocaleConfig,
} from 'react-native-calendars'
import { CalendarDay } from 'components/CalendarComponents/CalendarDay'
import { theme as appTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { getDatesBetween, getShortWeekDays } from 'utils/dates'
import { useTranslation } from 'react-i18next'

type ClickProps = {
  dateString: string
  timestamp: number
  day: number
  month: number
  year: number
}

type MarkedDateType = {
  selected?: boolean
  color?: string
  endingDay?: boolean
  startingDay?: boolean
}

type CustomCalendarProps = {
  onSelectedPeriodChange?: F2<string, string>
  selectable?: boolean
}

export const Calendar = ({
  theme,
  onSelectedPeriodChange,
  selectable = false,
  ...props
}: RNCalendarProps & CustomCalendarProps) => {
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
        ...theme,
      }}
      dayComponent={CalendarDay}
      onDayPress={handleClick}
      renderHeader={(date: Date) => <CalendarHeader date={date} />}
      markedDates={genMarkedDates(selectedPeriodStart, selectedPeriodEnd)}
      {...props}
    />
  )
}

const genMarkedDates = (start: string | undefined, end: string | undefined) => {
  if (!start || !end) return {}
  const obj: { [key: string]: MarkedDateType } = {}
  const dates = getDatesBetween(start, end)

  dates.forEach((date) => {
    obj[date] = {
      selected: true,
    }
  })

  obj[dates[0]].startingDay = true
  obj[dates[dates.length - 1]].endingDay = true
  return obj
}
