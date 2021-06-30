import React from 'react'
import { Box, mkUseStyles, Text } from 'utils/theme'
import { BorderlessButton } from 'react-native-gesture-handler'
import { DayComponentProps } from 'react-native-calendars'
import { DateTime } from 'luxon'
import { isWeekend } from 'utils/dates'

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
  return (
    <Box
      style={[
        marking?.selected && styles.selected,
        marking?.period && styles.selectedPeriod,
        marking?.endingDay && styles.end,
        marking?.startingDay && styles.start,
        marking?.period && isWeekend(day) && styles.selectedDisabled,
      ]}>
      <BorderlessButton onPress={() => onPress(date)} enabled={!isWeekend(day)}>
        <Box
          borderRadius="l"
          borderWidth={state === 'today' || marking?.selected ? 2 : 0}
          borderColor={marking?.period ? 'white' : 'black'}
          backgroundColor={marking?.selected && !marking?.period ? 'black' : 'transparent'}
          width={28}
          height={28}
          justifyContent="center"
          alignItems="center"
          margin="s">
          <Text color={textColor()} variant={isWeekend(day) ? 'regular15Calendar' : 'bold15'}>
            {date.day}
          </Text>
        </Box>
      </BorderlessButton>
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
