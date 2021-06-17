import React, { useState } from 'react'
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
import { DateTime } from 'luxon'

type clickProps = {
  dateString: string
  timestamp: number
  day: number
  month: number
  year: number
}

type customCalendarProps = {
  selectable?: boolean
}

export const Calendar = ({
  theme,
  selectable = false,
  ...props
}: RNCalendarProps & customCalendarProps) => {
  const [selectedPeriodStart, setSelectedPeriodStart] = useState<string | undefined>()
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState<string | undefined>()

  const handleClick = ({ dateString }: clickProps) => {
    if (!selectable) return
    if (!selectedPeriodStart || !selectedPeriodEnd) {
      setSelectedPeriodStart(dateString)
      setSelectedPeriodEnd(dateString)
      return
    }
    const clickedDate = dateString
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

function getDatesBetween(start: string, end: string) {
  const st = DateTime.fromISO(start)
  const ed = DateTime.fromISO(end)

  const dates: string[] = []

  for (let i = 0; st.plus({ days: i }).toISODate() <= ed.toISODate(); i++) {
    dates.push(st.plus({ days: i }).toISODate())
  }

  return dates
}

function genMarkedDates(start: string | undefined, end: string | undefined) {
  if (!start || !end) return {}

  const obj: { [key: string]: any } = {}
  const dates = getDatesBetween(start, end)

  dates.forEach((date) => {
    obj[date] = {
      selected: true,
      color: 'orange',
    }
  })

  obj[dates[0]].startingDay = true
  obj[dates[dates.length - 1]].endingDay = true

  return obj
}
