import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { BorderlessButton } from 'react-native-gesture-handler'
import { DayComponentProps } from 'react-native-calendars'
import { DateTime } from 'luxon'
import { isWeekend } from 'utils/dates'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

type CalendarDayMainProps = Pick<DayComponentProps, 'marking' | 'date' | 'state' | 'onPress'>

export const CalendarDayMain = ({ date, state, marking, onPress }: CalendarDayMainProps) => {
  const styles = useStyles()
  const day = DateTime.fromISO(date.dateString)
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
    top: -1,
    left: -1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }))
  return (
    <Box
      style={[
        marking?.selected && styles.selected,
        marking?.period && styles.selectedPeriod,
        marking?.endingDay && styles.end,
        marking?.startingDay && styles.start,
        marking?.period && isWeekend(day) && styles.selectedDisabled,
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

const useStyles = mkUseStyles((theme) => ({
  selected: {
    borderBottomRightRadius: theme.borderRadii.full,
    borderTopRightRadius: theme.borderRadii.full,
    borderBottomLeftRadius: theme.borderRadii.full,
    borderTopLeftRadius: theme.borderRadii.full,
  },
  selectedDisabled: {
    backgroundColor: '#ffc59e',
  },
  end: {
    borderBottomRightRadius: theme.borderRadii.full,
    borderTopRightRadius: theme.borderRadii.full,
  },
  start: {
    borderBottomLeftRadius: theme.borderRadii.full,
    borderTopLeftRadius: theme.borderRadii.full,
  },
  selectedPeriod: {
    backgroundColor: theme.colors.tertiary,
  },
}))
