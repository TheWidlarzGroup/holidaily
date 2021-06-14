import React from 'react'
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

type CalendarProps = RNCalendarProps

export const Calendar = ({ theme, ...props }: CalendarProps) => {
  const { i18n } = useTranslation()
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = getShortWeekDays(i18n.language)
  return (
    <RNCalendar
      firstDay={1}
      hideExtraDays
      theme={{
        textDayFontFamily: 'Nunito-Regular',
        textDayFontSize: 12,
        textSectionTitleColor: appTheme.colors.grey,
        arrowColor: appTheme.colors.black,
        ...theme,
      }}
      dayComponent={CalendarDay}
      renderHeader={(date) => <CalendarHeader date={date} />}
      {...props}
    />
  )
}
