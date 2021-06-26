import React, { useState, useRef, useEffect } from 'react'
import { Box, Text, theme as appTheme } from 'utils/theme'
import {
  Calendar as RNCalendar,
  WeekCalendar as RNWeekCalendar,
  CalendarProvider,
  LocaleConfig,
} from 'react-native-calendars'
import CalendarHeader from 'react-native-calendars/src/calendar/header'
import XDate from 'xdate'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import ArrowRight from 'assets/icons/arrow-right.svg'
import { useTranslation } from 'react-i18next'
import { getShortWeekDays } from 'utils/dates'
import { useBooleanState } from 'hooks/useBooleanState'
import { CustomModal } from 'components/CustomModal'
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED } from 'react-native-month-year-picker'
import deepmerge from 'deepmerge'
import { Platform } from 'react-native'
import { CalendarHeader as CalendarHeaderComponent } from './CalendarComponents/CalendarHeader'
import { CalendarDay } from './CalendarComponents/CalendarDay'

type MonthChangeEventType = ACTION_DATE_SET | ACTION_DISMISSED
export const ExpandableCalendar = ({ markedDates, ...props }) => {
  const { i18n } = useTranslation()
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = getShortWeekDays(i18n.language)
  const calendarRef = useRef<RNCalendar>(null)
  const weekCalendarRef = useRef<RNWeekCalendar>(null)
  const [selectedDate, setSelectedDate] = useState(new XDate())
  const [isWeekView, { setTrue: setIsWeekView, setFalse: setMonthView }] = useBooleanState(true)
  const [isPickerVisible, { setTrue: showPicker, setFalse: hidePicker }] = useBooleanState(false)

  const handlePicker = (event: MonthChangeEventType, newDate: Date) => {
    hidePicker()
    if (event === ACTION_DATE_SET) setSelectedDate(new XDate(newDate))
  }
  useEffect(() => {
    calendarRef?.current?.updateMonth(selectedDate)
  }, [selectedDate])

  const theme = {
    calendarBackground: 'transparent',
  }
  const headerTheme = {
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
      week: {
        marginTop: 7,
        paddingRight: 5,
        paddingLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      dayHeader: {
        width: 32,
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
        color: appTheme.colors.grey,
      },
    },
    ...theme,
  }
  const calendarTheme = {
    'stylesheet.calendar.header': {
      header: {
        display: 'none',
      },
    },
    ...theme,
  }
  const weekendCalendarTheme = {
    'stylesheet.expandable.main': {
      week: {
        marginTop: 7,
        marginBottom: 10,
        paddingRight: 5,
        paddingLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      dayHeader: {
        width: 32,
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
        color: appTheme.colors.grey,
      },
    },
    ...theme,
  }
  return (
    <>
      <Box>
        <CalendarHeader
          month={selectedDate}
          renderHeader={(date: Date) => (
            <CalendarHeaderComponent date={date} onHeaderPressed={showPicker} />
          )}
          renderArrow={(direction: 'left' | 'right') =>
            direction === 'left' ? <ArrowLeft /> : <ArrowRight />
          }
          theme={headerTheme}
          addMonth={(count: 1 | -1) => {
            if (isWeekView) setSelectedDate(selectedDate.clone().addWeeks(count))
            else setSelectedDate(selectedDate.clone().addMonths(count, true).setDate(1))
          }}
        />
        {isWeekView ? (
          <Box style={{ height: 60 }}>
            <CalendarProvider
              date={selectedDate.toDate()}
              onDateChanged={(date: Date) => {
                const newDate = new XDate(date)
                if (selectedDate.toString('yyyy-MM') !== newDate.toString('yyyy-MM'))
                  setSelectedDate(newDate)
              }}>
              <RNWeekCalendar
                hideDayNames
                firstDay={1}
                theme={weekendCalendarTheme}
                dayComponent={CalendarDay}
                onDayPress={({ year, month, day }: { year: number; month: number; day: number }) =>
                  setSelectedDate(
                    new XDate(
                      new XDate()
                        .setFullYear(year)
                        .setMonth(month - 1)
                        .setDate(day)
                    )
                  )
                }
                markedDates={deepmerge(markedDates, {
                  [selectedDate.toString('yyyy-MM-dd')]: { selected: true },
                })}
                ref={weekCalendarRef}
                {...props}
              />
            </CalendarProvider>
          </Box>
        ) : (
          <RNCalendar
            hideDayNames
            hideExtraDays
            firstDay={1}
            theme={calendarTheme}
            dayComponent={CalendarDay}
            onDayPress={({ dateString }: { dateString: string }) =>
              setSelectedDate(new XDate(dateString))
            }
            markedDates={deepmerge(markedDates, {
              [selectedDate.toString('yyyy-MM-dd')]: { selected: true },
            })}
            ref={calendarRef}
            {...props}
          />
        )}
      </Box>
      {Platform.OS === 'ios' ? (
        <CustomModal
          style={{
            position: 'absolute',
            bottom: -20,
            left: -20,
            right: -20,
          }}
          isVisible={isPickerVisible}
          onBackdropPress={hidePicker}>
          <MonthPicker value={selectedDate} onChange={handlePicker} />
        </CustomModal>
      ) : (
        <MonthPicker value={selectedDate} onChange={handlePicker} />
      )}
    </>
  )
}
