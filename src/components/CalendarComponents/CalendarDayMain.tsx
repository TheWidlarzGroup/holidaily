import React from 'react'
import { Box, Text, Theme } from 'utils/theme'
import { BorderlessButton } from 'react-native-gesture-handler'
import { isToday, isWeekend } from 'utils/dates'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { ViewStyle } from 'react-native'
import { isHoliday } from 'poland-public-holidays'
import { TextProps } from '@shopify/restyle'
import { NewDayComponentProps } from './CalendarTypes'

type CalendarDayMainProps = Pick<NewDayComponentProps, 'marking' | 'date' | 'state' | 'onPress'> &
  MarkingStyles

export type MarkingStyles = {
  styles: {
    selectedDay: ViewStyle
    dayInPeriod: ViewStyle
    periodEndDay: ViewStyle
    periodStartDay: ViewStyle
    disabledDay: ViewStyle
  }
  dayTextColor?: TextProps<Theme>['color']
}

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const CalendarDayMain = (p: CalendarDayMainProps) => {
  const day = p.date.dateString
  const isNotAWorkingDay = isWeekend(day) || isHoliday(day)
  const isDisabled = isNotAWorkingDay || !!p.marking?.disabled
  const textColor = () => {
    if (isDisabled && p.marking?.period) return 'errorRed'
    if (isDisabled) return 'headerGreyDarker'
    if (p.marking?.selected || p.marking?.period) return 'white'
    return p.dayTextColor ?? 'black'
  }

  const containerStyles = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      p.marking?.selected && !p.marking?.period ? 'disabledTextBrighter' : 'primary'
    ),
  }))

  const getDateBgColor = () => {
    if (isToday(day) && !p.marking?.selected) return 'disabledTextBrighter'
    if (p.marking?.selected && isToday(day)) return 'primary'
    if (p.marking?.selected) return 'primary'
    return 'transparent'
  }

  return (
    <Box
      style={[
        p.marking?.selected && p.styles.selectedDay,
        p.marking?.period && p.styles.dayInPeriod,
        p.marking?.endingDay && p.styles.periodEndDay,
        p.marking?.startingDay && p.styles.periodStartDay,
        p.marking?.period && isNotAWorkingDay && p.styles.disabledDay,
      ]}>
      <AnimatedBox
        borderRadius="lmin"
        width={30}
        height={30}
        margin="s"
        justifyContent="center"
        alignItems="center"
        style={containerStyles}>
        <BorderlessButton
          onPress={() => p.onPress(p.date)}
          enabled={!isDisabled}
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
          <Box
            borderRadius="l"
            backgroundColor={getDateBgColor()}
            width={28}
            height={28}
            justifyContent="center"
            alignItems="center">
            <Text color={textColor()} variant="regular14Calendar">
              {p.date.day}
            </Text>
          </Box>
        </BorderlessButton>
      </AnimatedBox>
    </Box>
  )
}
