import React, { useRef, useEffect, useMemo } from 'react'
import { BaseOpacity, Box, useTheme } from 'utils/theme'
import { CalendarProps as RNCalendarProps, DateObject, LocaleConfig } from 'react-native-calendars'
import CalendarHeader from 'react-native-calendars/src/calendar/header'
import XDate from 'xdate'
import ArrowLeft from 'assets/icons/arrow-left.svg'
import ArrowRight from 'assets/icons/arrow-right.svg'
import ArrowDown from 'assets/icons/arrowDown.svg'
import { getISODateString, getShortWeekDays } from 'utils/dates'
import { useBooleanState } from 'hooks/useBooleanState'
import { CustomModal } from 'components/CustomModal'
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED } from 'react-native-month-year-picker'
import deepmerge from 'deepmerge'
import { LayoutChangeEvent, ViewProps } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  Easing,
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
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { useLanguage } from 'hooks/useLanguage'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { doesMonthInCalendarHasSixRows } from 'utils/doesMonthInCalendarHasSixRows'
import { BASE_CALENDAR_HEIGHT, WEEK_CALENDAR_HEIGHT } from 'screens/calendar/utils'
import { getInitialCalendarHeight } from 'utils/getInitialCalendarHeight'
import { CalendarHeader as CalendarHeaderComponent } from './CalendarComponents/CalendarHeader'
import { CalendarDay } from './CalendarComponents/CalendarDay'
import { calendarTheme, headerTheme } from './CalendarComponents/ExplandableCalendarTheme'
import { WeekCalendar } from './CalendarComponents/WeekCalendar'
import { CalendarRef } from './CalendarComponents/CalendarTypes'
import { NewCalendar } from './CalendarComponents/NewCalendar'

export type Dot = { key: string; color: string }
type MonthChangeEventType = ACTION_DATE_SET | ACTION_DISMISSED
type MarkedDatesMultiDots = { [key: string]: { dots: Dot[] } }
type ExpandableCalendarProps = {
  isFullHeight: boolean
  setIsFullHeight: F1<boolean>
  markedDates: MarkedDatesMultiDots
  selectedDate: Date
  setSelectedDate: F1<Date>
  onDayPress: F1<DateObject>
}

export const ExpandableCalendar = (props: ExpandableCalendarProps & RNCalendarProps) => {
  const { markedDates, selectedDate, setSelectedDate, ...restProps } = props
  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = getShortWeekDays()
  const [language] = useLanguage()
  const { userSettings, updateSettings } = useUserSettingsContext()
  const hasUserSeenCalendar = userSettings?.hasUserSeenCalendar
  const EXTRA_HEIGHT = doesMonthInCalendarHasSixRows(selectedDate) ? 65 : 0

  const calendarRef = useRef<CalendarRef>(null)
  const [isPickerVisible, { setTrue: showPicker, setFalse: hidePicker }] = useBooleanState(false)
  const fullCalendarContainerRef = useAnimatedRef()
  const fullCalendarHeight = useSharedValue(BASE_CALENDAR_HEIGHT)
  const containerHeight = useSharedValue(
    getInitialCalendarHeight(isScreenHeightShort, hasUserSeenCalendar || false)
  )

  const rotation = useSharedValue(0)
  const rotationStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const opacity = useDerivedValue(() =>
    containerHeight.value > WEEK_CALENDAR_HEIGHT ? withTiming(1) : withTiming(0)
  )

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
      if (event.translationY > 40) {
        containerHeight.value = withSpring(fullCalendarHeight.value, { overshootClamping: true })
      } else if (event.translationY < -40) {
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
  const theme = useTheme()
  const containerPadding: ViewProps['style'] = { paddingBottom: theme.spacing.m }

  useEffect(() => {
    const expandCalendarOnFirstAppLaunch = () => {
      if (hasUserSeenCalendar) return
      updateSettings({ hasUserSeenCalendar: true })
      const delay = 1500
      const timeout = setTimeout(() => {
        containerHeight.value = isScreenHeightShort
          ? withTiming(WEEK_CALENDAR_HEIGHT)
          : withTiming(BASE_CALENDAR_HEIGHT + EXTRA_HEIGHT)
      }, delay)

      return () => clearTimeout(timeout)
    }
    expandCalendarOnFirstAppLaunch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newMarkedDates = useMemo(
    () =>
      deepmerge(markedDates, {
        [getISODateString(selectedDate)]: { selected: true },
      }),
    [markedDates, selectedDate]
  )

  const trackCalendarHeight = (e: LayoutChangeEvent) => {
    const { layout } = e.nativeEvent
    if (layout.y > 300) {
      props.setIsFullHeight(true)
      rotation.value = withSpring(180)
    } else {
      props.setIsFullHeight(false)
      rotation.value = withSpring(0)
    }
  }

  const toggleOnPress = () => {
    if (containerHeight.value > WEEK_CALENDAR_HEIGHT) {
      containerHeight.value = withTiming(WEEK_CALENDAR_HEIGHT, {
        duration: 1000,
        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
      })
    } else {
      containerHeight.value = withSpring(fullCalendarHeight.value, { overshootClamping: true })
    }
  }

  useEffect(() => {
    if (!props.isFullHeight && containerHeight.value > WEEK_CALENDAR_HEIGHT) {
      containerHeight.value = withTiming(WEEK_CALENDAR_HEIGHT, {
        duration: 1000,
        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
      })
    }
  }, [props.isFullHeight, containerHeight])

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[containerHeightStyles, containerPadding]}>
          <CalendarHeader
            month={new XDate(selectedDate)}
            renderHeader={(date: Date) => (
              <CalendarHeaderComponent date={date} onHeaderPressed={showPicker} />
            )}
            renderArrow={(direction: 'left' | 'right') =>
              direction === 'left' ? (
                <ArrowLeft color={theme.colors.black} />
              ) : (
                <ArrowRight color={theme.colors.black} />
              )
            }
            theme={headerTheme}
            addMonth={handleAddMonth}
            firstDay={1}
          />
          <Animated.View style={[weekOpacity, { zIndex: theme.zIndices['10'] }]}>
            <Box>
              <Box
                style={{
                  height: WEEK_CALENDAR_HEIGHT,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                }}>
                <WeekCalendar
                  hideExtraDays
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
                dayComponent={CalendarDay}
                markedDates={newMarkedDates}
                markingType="multi-dot"
                disableMonthChange
                ref={calendarRef}
                {...restProps}
              />
            </Box>
          </Animated.View>
          <BaseOpacity
            hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}
            onLayout={trackCalendarHeight}
            onPress={toggleOnPress}
            justifyContent="center"
            alignItems="center"
            marginTop="m">
            <Animated.View style={[rotationStyles]}>
              <ArrowDown color={theme.colors.black} />
            </Animated.View>
          </BaseOpacity>
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
