import React, { useRef, useEffect } from 'react'
import { Box } from 'utils/theme'
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
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { isIos } from 'utils/layout'
import { DateTime } from 'luxon'
import { CalendarHeader as CalendarHeaderComponent } from './CalendarComponents/CalendarHeader'
import { CalendarDay } from './CalendarComponents/CalendarDay'
import {
  calendarTheme,
  headerTheme,
  weekendCalendarTheme,
} from './CalendarComponents/ExplandableCalendarTheme'

type MonthChangeEventType = ACTION_DATE_SET | ACTION_DISMISSED
type MarkedDatesMultiDots = { [key: string]: { dots: { key: string | number; color: string }[] } }
type ExpandableCalendarProps = {
  markedDates: MarkedDatesMultiDots
  selectedDate: DateTime
  setSelectedDate: F1<DateTime>
}

const WEEK_CALENDAR_HEIGHT = 62
const BASE_CALENDAR_HEIGHT = 290

export const ExpandableCalendar = (props: ExpandableCalendarProps & RNCalendarProps) => {
  const { markedDates, selectedDate, setSelectedDate, ...restProps } = props
  const { i18n } = useTranslation()
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = getShortWeekDays(i18n.language)
  const calendarRef = useRef<RNCalendar>(null)
  const weekCalendarRef = useRef<RNWeekCalendar>(null)
  const [isPickerVisible, { setTrue: showPicker, setFalse: hidePicker }] = useBooleanState(false)

  const handlePicker = (event: MonthChangeEventType, newDate: Date) => {
    hidePicker()
    if (event === ACTION_DATE_SET) setSelectedDate(DateTime.fromJSDate(newDate))
  }
  useEffect(() => {
    calendarRef?.current?.updateMonth(new XDate(selectedDate.toISODate()))
  }, [selectedDate])
  const handleAddMonth = (count: 1 | -1) => {
    if (containerHeight.value === WEEK_CALENDAR_HEIGHT)
      setSelectedDate(selectedDate.plus({ weeks: count }))
    else setSelectedDate(selectedDate.plus({ months: count }))
  }

  const onMonthChange = ({ dateString }: { dateString: string }) => {
    setSelectedDate(DateTime.fromISO(dateString))
  }

  const fullCalendarContainerRef = useAnimatedRef()
  const fullCalendarHeight = useSharedValue(BASE_CALENDAR_HEIGHT)
  const containerHeight = useSharedValue(fullCalendarHeight.value)
  const opacity = useDerivedValue(() =>
    containerHeight.value >= fullCalendarHeight.value ? withTiming(1) : withTiming(0)
  )
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetY: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetY = containerHeight.value
    },
    onActive: (event, ctx) => {
      const newHeight = event.translationY + ctx.offsetY
      containerHeight.value = newHeight > WEEK_CALENDAR_HEIGHT ? newHeight : WEEK_CALENDAR_HEIGHT
    },
    onEnd: (event) => {
      containerHeight.value =
        event.translationY > 100
          ? withSpring(fullCalendarHeight.value, { overshootClamping: true })
          : withSpring(WEEK_CALENDAR_HEIGHT, { overshootClamping: true })
    },
  })

  const containerHeightStyles = useAnimatedStyle(() => ({
    minHeight: containerHeight.value,
  }))
  const weekOpacity = useAnimatedStyle(() => ({
    opacity: 1 - opacity.value,
  }))
  const fullOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
    display: opacity.value === 0 ? 'none' : 'flex',
  }))
  return (
    <>
      <CalendarHeader
        month={new XDate(selectedDate.toISODate())}
        renderHeader={(date: Date) => (
          <CalendarHeaderComponent date={date} onHeaderPressed={showPicker} />
        )}
        renderArrow={(direction: 'left' | 'right') =>
          direction === 'left' ? <ArrowLeft /> : <ArrowRight />
        }
        theme={headerTheme}
        addMonth={handleAddMonth}
        firstDay={1}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={containerHeightStyles}>
          <Animated.View style={weekOpacity}>
            <Box style={{ height: WEEK_CALENDAR_HEIGHT, position: 'absolute' }}>
              <CalendarProvider date={selectedDate.toJSDate()} onMonthChange={onMonthChange}>
                <RNWeekCalendar
                  hideDayNames
                  firstDay={1}
                  theme={weekendCalendarTheme}
                  dayComponent={CalendarDay}
                  markedDates={deepmerge(markedDates, {
                    [selectedDate.toISODate()]: { selected: true },
                  })}
                  ref={weekCalendarRef}
                  pastScrollRange={0}
                  futureScrollRange={0}
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
                markedDates={deepmerge(markedDates, {
                  [selectedDate.toISODate()]: { selected: true },
                })}
                ref={calendarRef}
                {...restProps}
              />
            </Box>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      {isIos ? (
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
        isPickerVisible && <MonthPicker value={selectedDate} onChange={handlePicker} />
      )}
    </>
  )
}
