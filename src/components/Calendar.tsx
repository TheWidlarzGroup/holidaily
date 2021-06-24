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
import ArrowLeft from 'assets/icons/arrow-left.svg'
import ArrowRight from 'assets/icons/arrow-right.svg'

type CustomCalendarProps = {
  onHeaderPressed?: F0
}

export const Calendar = React.forwardRef(
  (
    {
      theme: themeProp,
      onHeaderPressed,
      markedDates = {},
      ...props
    }: RNCalendarProps & CustomCalendarProps,
    ref: RNCalendar
  ) => {
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

    return (
      <RNCalendar
        firstDay={1}
        hideExtraDays
        theme={theme}
        dayComponent={CalendarDay}
        renderHeader={(date: Date) => (
          <CalendarHeader date={date} onHeaderPressed={onHeaderPressed} />
        )}
        markedDates={{
          ...markedDates,
        }}
        renderArrow={(direction: 'left' | 'right') =>
          direction === 'left' ? <ArrowLeft /> : <ArrowRight />
        }
        ref={ref}
        {...props}
      />
    )
  }
)
Calendar.displayName = 'Calendar'
