import React from 'react'
import { Box, Text } from 'utils/theme'
import { BorderlessButton } from 'react-native-gesture-handler'
import { isWeekend } from 'utils/dates'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { ViewStyle } from 'react-native'
import { isHoliday } from 'poland-public-holidays'
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
}

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const CalendarDayMain = ({
  date,
  state,
  marking,
  onPress,
  styles,
}: CalendarDayMainProps) => {
  const day = date.dateString
  const isNotAWorkingDay = isWeekend(day) || isHoliday(day)
  const textColor = () => {
    const isDisabled = isWeekend(day) || marking?.disabled || false
    if (isDisabled && marking?.period) return 'white'
    if (isDisabled) return 'grey'
    if (marking?.selected || marking?.period) return 'white'
    return 'black'
  }

  const containerStyles = useAnimatedStyle(() => ({
    backgroundColor: withTiming(marking?.selected && !marking?.period ? '#000000ff' : '#00000000'),
  }))
  return (
    <Box
      style={[
        marking?.selected && styles.selectedDay,
        marking?.period && styles.dayInPeriod,
        marking?.endingDay && styles.periodEndDay,
        marking?.startingDay && styles.periodStartDay,
        marking?.period && isNotAWorkingDay && styles.disabledDay,
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
          onPress={() => onPress(date)}
          enabled={!isNotAWorkingDay}
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
          <Box
            borderRadius="l"
            borderWidth={state === 'today' ? 2 : 0}
            borderColor={marking?.period ? 'white' : 'black'}
            backgroundColor="transparent"
            width={28}
            height={28}
            justifyContent="center"
            alignItems="center">
            <Text color={textColor()} variant={isNotAWorkingDay ? 'regular15Calendar' : 'bold15'}>
              {date.day}
            </Text>
          </Box>
        </BorderlessButton>
      </AnimatedBox>
    </Box>
  )
}
