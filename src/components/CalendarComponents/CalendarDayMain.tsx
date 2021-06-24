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
    if (state === 'selected' || marking?.selected) return 'white'
    if (isWeekend(day)) return 'grey'
    if (marking?.disabled === true) return 'grey'
    return 'black'
  }

  return (
    <Box
      style={[
        marking?.selected && !marking?.period && styles.selected,
        marking?.selected && marking?.period && styles.selectedPeriod,
        marking?.selected && marking?.endingDay && styles.end,
        marking?.selected && marking?.startingDay && styles.start,
        marking?.selected && marking?.period && isWeekend(day) && styles.selectedDisabled,
      ]}>
      <BorderlessButton onPress={() => onPress(date)} enabled={!isWeekend(day)}>
        <Box
          borderRadius="l"
          borderWidth={state === 'today' ? 2 : 0}
          borderColor={marking?.selected ? 'white' : 'black'}
          backgroundColor={state === 'selected' ? 'black' : 'transparent'}
          width={28}
          height={28}
          justifyContent="center"
          alignItems="center"
          margin="s">
          <Text color={textColor()} variant="bold15">
            {date.day}
          </Text>
        </Box>
      </BorderlessButton>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  selected: {
    color: theme.colors.white,
    backgroundColor: theme.colors.black,
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
    color: theme.colors.white,
    backgroundColor: theme.colors.tertiary,
  },
}))
