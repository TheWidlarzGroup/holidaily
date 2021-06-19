import React, { useState, useEffect } from 'react'
import { LocaleConfig } from 'react-native-calendars'
import { theme as appTheme } from 'utils/theme'
import { CalendarHeader } from 'components/CalendarComponents/CalendarHeader'
import { getShortWeekDays } from 'utils/dates'
import { useTranslation } from 'react-i18next'
import { genMarkedDates } from 'utils/genMarkedDates'
import { NewCalendarBaseProps } from './CalendarComponents/CalendarTypes'
import { NewCalendar } from './CalendarComponents/NewCalendar'

type ClickProps = {
  dateString: string
  timestamp: number
  day: number
  month: number
  year: number
}

type CustomCalendarProps = {
  onSelectedPeriodChange?: F2<
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>
  >
  selectable?: boolean
}

export const Calendar = ({
  theme,
  onSelectedPeriodChange,
  selectable = false,
  ...props
}: NewCalendarBaseProps & CustomCalendarProps) => {
  const [selectedPeriodStart, setSelectedPeriodStart] = useState<string | undefined>(undefined)
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState<string | undefined>(undefined)

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
    <NewCalendar
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
      {...props}
      onDayPress={handleClick}
      renderHeader={(date: Date) => <CalendarHeader date={date} />}
      markedDates={genMarkedDates(selectedPeriodStart, selectedPeriodEnd)}
    />
  )
}
