import React, { useRef, useEffect, useCallback } from 'react'
import { Box } from 'utils/theme'
import { CalendarProps as RNCalendarProps, DateObject, LocaleConfig } from 'react-native-calendars'
import CalendarHeader from 'react-native-calendars/src/calendar/header'
import XDate from 'xdate'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import ArrowRight from 'assets/icons/arrow-right.svg'
import { getISODateString, getShortWeekDays } from 'utils/dates'
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
import { addMonths, addWeeks } from 'date-fns'
import { startOfMonth, startOfWeek } from 'date-fns/esm'
import { useLanguage } from 'hooks/useLanguage'
import { useCalendarPeriodStyles } from 'hooks/useCalendarStyles'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { CalendarHeader as CalendarHeaderComponent } from './CalendarComponents/CalendarHeader'
import { CalendarDay } from './CalendarComponents/CalendarDay'
import { calendarTheme, headerTheme } from './CalendarComponents/ExplandableCalendarTheme'
import { WeekCalendar } from './CalendarComponents/WeekCalendar'
import { CalendarRef, NewDayComponentProps } from './CalendarComponents/CalendarTypes'
import { NewCalendar } from './CalendarComponents/NewCalendar'

type MonthChangeEventType = ACTION_DATE_SET | ACTION_DISMISSED
type MarkedDatesMultiDots = { [key: string]: { dots: { key: string; color: string }[] } }
type ExpandableCalendarProps = {
  markedDates: MarkedDatesMultiDots
  selectedDate: Date
  setSelectedDate: F1<Date>
  onDayPress: F1<DateObject>
}

const WEEK_CALENDAR_HEIGHT = 50
const BASE_CALENDAR_HEIGHT = 290

export const ExpandableCalendar = (props: ExpandableCalendarProps & RNCalendarProps) => {
  const { markedDates, selectedDate, setSelectedDate, ...restProps } = props
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = getShortWeekDays()
  const [language] = useLanguage()

  const calendarRef = useRef<CalendarRef>(null)
  const [isPickerVisible, { setTrue: showPicker, setFalse: hidePicker }] = useBooleanState(false)
  const fullCalendarContainerRef = useAnimatedRef()
  const fullCalendarHeight = useSharedValue(
    isScreenHeightShort ? BASE_CALENDAR_HEIGHT : WEEK_CALENDAR_HEIGHT
  )
  const containerHeight = useSharedValue(fullCalendarHeight.value)
  const opacity = useDerivedValue(() =>
    containerHeight.value > WEEK_CALENDAR_HEIGHT ? withTiming(1) : withTiming(0)
  )
  const { validPeriodStyles } = useCalendarPeriodStyles()
  const handlePicker = (event: MonthChangeEventType, newDate: Date) => {
    hidePicker()
    if (event === ACTION_DATE_SET) setSelectedDate(newDate)
  }

  useEffect(() => {
    calendarRef?.current?.updateMonth(new XDate(selectedDate))
  }, [selectedDate])

  const handleAddMonth = (count: 1 | -1) => {
    if (containerHeight.value === WEEK_CALENDAR_HEIGHT)
      setSelectedDate(startOfWeek(addWeeks(selectedDate, count), { weekStartsOn: 1 }))
    else setSelectedDate(startOfMonth(addMonths(selectedDate, count)))
  }

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
      if (event.translationY > 100) {
        containerHeight.value = withSpring(fullCalendarHeight.value, { overshootClamping: true })
      } else if (event.translationY < -60) {
        containerHeight.value = withSpring(WEEK_CALENDAR_HEIGHT, { overshootClamping: true })
      } else {
        containerHeight.value =
          containerHeight.value > WEEK_CALENDAR_HEIGHT * 4
            ? withSpring(fullCalendarHeight.value, { overshootClamping: true })
            : withSpring(WEEK_CALENDAR_HEIGHT, { overshootClamping: true })
      }
    },
  })

  const containerHeightStyles = useAnimatedStyle(() => ({
    minHeight:
      containerHeight.value > WEEK_CALENDAR_HEIGHT ? containerHeight.value : WEEK_CALENDAR_HEIGHT,
  }))
  const weekOpacity = useAnimatedStyle(() => ({
    opacity: 1 - opacity.value,
  }))
  const fullOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
    maxHeight: containerHeight.value,
  }))

  useEffect(() => {
    const timeout = isIos ? 2000 : 3500

    setTimeout(() => {
      containerHeight.value = isScreenHeightShort
        ? withTiming(WEEK_CALENDAR_HEIGHT)
        : withSpring(BASE_CALENDAR_HEIGHT)
    }, timeout)
  }, [containerHeight])

  return (
    <>
      <CalendarHeader
        month={new XDate(selectedDate)}
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
            <Box>
              <Box
                style={{
                  height: WEEK_CALENDAR_HEIGHT,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                }}>
                <WeekCalendar
                  date={selectedDate}
                  markedDates={deepmerge(markedDates, {
                    [getISODateString(selectedDate)]: { selected: true },
                  })}
                  {...restProps}
                />
              </Box>
            </Box>
          </Animated.View>
          <Animated.View
            style={[fullOpacity, { transform: [{ translateY: -7 }], overflow: 'hidden' }]}>
            <Box
              ref={fullCalendarContainerRef}
              onLayout={({ nativeEvent: { layout } }) => {
                fullCalendarHeight.value = layout.height
                if (containerHeight.value > WEEK_CALENDAR_HEIGHT * 4) {
                  containerHeight.value = withSpring(layout.height, {
                    overshootClamping: true,
                  })
                }
              }}>
              <NewCalendar
                hideDayNames
                hideExtraDays
                firstDay={1}
                theme={calendarTheme}
                // FIXME: NewCalendar type in CalendarTypes differs from Calendar type defined in react-native-calendars, probably purposely,
                // but NewCalendar component or the CalendarDay component don't have a type guard to let their props differ, and so runtime type-errors may occur
                dayComponent={useCallback<F1<NewDayComponentProps>>(
                  (props) => (
                    <CalendarDay {...props} styles={validPeriodStyles} />
                  ),
                  [validPeriodStyles]
                )}
                markedDates={deepmerge(markedDates, {
                  [getISODateString(selectedDate)]: { selected: true },
                })}
                markingType="multi-dot"
                disableMonthChange
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
          <MonthPicker
            value={selectedDate}
            onChange={handlePicker}
            locale={language}
            mode="short"
          />
        </CustomModal>
      ) : (
        isPickerVisible && (
          <MonthPicker
            value={selectedDate}
            onChange={handlePicker}
            locale={language}
            mode="short"
          />
        )
      )}
    </>
  )
}
