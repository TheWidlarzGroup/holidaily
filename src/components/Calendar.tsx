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

export const Calendar = ({ theme, ...props }: RNCalendarProps) => {
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
      renderHeader={(date: Date) => <CalendarHeader date={date} />}
      {...props}
    />
  )
}
