import React from 'react'
import { Box, Text } from 'utils/theme'
import { BorderlessButton } from 'react-native-gesture-handler'
import { isWeekend } from 'utils/dates'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { ViewStyle } from 'react-native'
import { NewDayComponentProps } from './CalendarTypes'

type CalendarDayMainProps = Pick<NewDayComponentProps, 'marking' | 'date' | 'state' | 'onPress'> & {
  styles: MarkingStyles
}

export type MarkingStyles = {
  selectedDay: ViewStyle
  dayInPeriod: ViewStyle
  periodEndDay: ViewStyle
  periodStartDay: ViewStyle
  disabledDay: ViewStyle
}

export const CalendarDayMain = ({
  date,
  state,
  marking,
  onPress,
  styles,
}: CalendarDayMainProps) => {
  const day = date.dateString
  const textColor = () => {
    const isDisabled = isWeekend(day) || marking?.disabled || state === 'disabled'
    if (isDisabled && marking?.period) return 'white'
    if (isDisabled) return 'grey'
    if (marking?.selected || marking?.period) return 'white'
    return 'black'
  }

  const containerStyles = useAnimatedStyle(() => ({
    borderRadius: 15,
    backgroundColor: withTiming(marking?.selected && !marking?.period ? '#000000ff' : '#00000000'),
    width: 30,
    height: 30,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }))
  return (
    <Box
      style={[
        marking?.selected && styles.selectedDay,
        marking?.period && styles.dayInPeriod,
        marking?.endingDay && styles.periodEndDay,
        marking?.startingDay && styles.periodStartDay,
        marking?.period && isWeekend(day) && styles.disabledDay,
      ]}>
      <Animated.View style={containerStyles}>
        <BorderlessButton
          onPress={() => onPress(date)}
          enabled={!isWeekend(day)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Box
            borderRadius="l"
            borderWidth={state === 'today' ? 2 : 0}
            borderColor={marking?.period ? 'white' : 'black'}
            backgroundColor="transparent"
            width={28}
            height={28}
            justifyContent="center"
            alignItems="center">
            <Text color={textColor()} variant={isWeekend(day) ? 'regular15Calendar' : 'bold15'}>
              {date.day}
            </Text>
          </Box>
        </BorderlessButton>
      </Animated.View>
    </Box>
  )
}
