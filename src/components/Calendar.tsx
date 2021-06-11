import React from 'react'
import {
  Calendar as RNCalendar,
  CalendarProps as RNCalendarProps,
  LocaleConfig,
} from 'react-native-calendars'
import { CalendarDay } from 'components/CalendarComponents/CalendarDay'
import { theme as appTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { useTranslation } from 'react-i18next'

type CalendarProps = RNCalendarProps

export const Calendar = ({ theme, ...props }: CalendarProps) => {
  const { t: tDays } = useTranslation('daysShort')
  const { t: tMonths } = useTranslation('months')
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = [
    tDays('sunday'),
    tDays('monday'),
    tDays('tuesday'),
    tDays('wednesday'),
    tDays('thursday'),
    tDays('friday'),
    tDays('saturday'),
  ]
  const monthNames = [
    tMonths('january'),
    tMonths('february'),
    tMonths('march'),
    tMonths('april'),
    tMonths('may'),
    tMonths('june'),
    tMonths('july'),
    tMonths('august'),
    tMonths('september'),
    tMonths('october'),
    tMonths('november'),
    tMonths('december'),
  ]
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
      renderHeader={(date) => <CalendarHeader monthName={monthNames[date.getMonth()]} />}
      {...props}
    />
  )
}
