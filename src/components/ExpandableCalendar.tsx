import React, { useRef, useEffect } from 'react'
import { Box, theme as appTheme } from 'utils/theme'
import {
  Calendar as RNCalendar,
  WeekCalendar as RNWeekCalendar,
  CalendarProps as RNCalendarProps,
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
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  measure,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { CalendarHeader as CalendarHeaderComponent } from './CalendarComponents/CalendarHeader'
import { CalendarDay } from './CalendarComponents/CalendarDay'

type MonthChangeEventType = ACTION_DATE_SET | ACTION_DISMISSED
type MarkedDatesMultiDots = { [key: string]: { dots: { key: string | number; color: string }[] } }
type ExpandableCalendarProps = {
  markedDates: MarkedDatesMultiDots
  selectedDate: XDate
  setSelectedDate: F1<XDate>
}

const WEEK_CALENDAR_HEIGHT = 70
const FULL_CALENDAR_HEIGHT = 290

export const ExpandableCalendar = (props: ExpandableCalendarProps & RNCalendarProps) => {
  const { markedDates, selectedDate, setSelectedDate, ...restProps } = props
  const { i18n } = useTranslation()
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = getShortWeekDays(i18n.language)
  const calendarRef = useRef<RNCalendar>(null)
  const weekCalendarRef = useRef<RNWeekCalendar>(null)
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

  const containerHeight = useSharedValue(70)
  const fullCalendarContainerRef = useAnimatedRef()
  const fullCalendarHeight = useSharedValue(FULL_CALENDAR_HEIGHT) // TODO: Measure content height
  // useDerivedValue(() => {
  //   //     'worklet'
  //   fullCalendarHeight.value = measure(fullCalendarContainerRef).height
  // })
  const opacity = useDerivedValue(() =>
    containerHeight.value >= fullCalendarHeight.value ? withTiming(1) : withTiming(0)
  )
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.offsetY = containerHeight.value
      // fullCalendarHeight.value = measure(fullCalendarContainerRef).height
    },
    onActive: (event, ctx) => {
      const newHeight = event.translationY + ctx.offsetY
      containerHeight.value = newHeight > 70 ? newHeight : 70
    },
    onEnd: (event, ctx) => {
      containerHeight.value =
        event.translationY > 100
          ? withSpring(fullCalendarHeight.value, { overshootClamping: true })
          : withSpring(WEEK_CALENDAR_HEIGHT, { overshootClamping: true })
    },
  })

  const containerHeightStyles = useAnimatedStyle(() => ({
    height: containerHeight.value,
  }))
  const weekOpacity = useAnimatedStyle(() => ({
    opacity: 1 - opacity.value,
    // height: opacity.value
    // display: opacity.value === 1 ? 'none' : 'flex',
  }))
  const fullOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
    display: opacity.value === 0 ? 'none' : 'flex',
  }))
  return (
    <>
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
          if (containerHeight.value === WEEK_CALENDAR_HEIGHT)
            setSelectedDate(selectedDate.clone().addWeeks(count))
          else setSelectedDate(selectedDate.clone().addMonths(count, true).setDate(1))
        }}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={containerHeightStyles}>
          <Animated.View style={weekOpacity}>
            <Box style={{ height: WEEK_CALENDAR_HEIGHT, position: 'absolute' }}>
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
                  onDayPress={({
                    year,
                    month,
                    day,
                  }: {
                    year: number
                    month: number
                    day: number
                  }) =>
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
                  {...restProps}
                />
              </CalendarProvider>
            </Box>
          </Animated.View>
          <Animated.View style={fullOpacity}>
            <Box ref={fullCalendarContainerRef}>
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
                {...restProps}
              />
            </Box>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
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
