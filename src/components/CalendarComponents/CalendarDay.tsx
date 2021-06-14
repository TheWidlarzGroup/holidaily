import React from 'react'
import { Box, Text } from 'utils/theme'
import { BorderlessButton } from 'react-native-gesture-handler'
import { DayComponentProps } from 'react-native-calendars'
import { DateTime } from 'luxon'
import { isWeekend } from 'utils/dates'

export const CalendarDay = ({ date, state, marking, onPress }: DayComponentProps) => {
  const day = DateTime.fromISO(date.dateString)
  const dots =
    typeof marking === 'object' && 'dots' in marking
      ? {
          firstThree: marking?.dots.slice(0, 3),
          isMore: marking?.dots.length > 3,
        }
      : {
          firstThree: [],
          isMore: false,
        }
  const textColor = () => {
    if (state === 'selected') return 'white'
    if (isWeekend(day)) return 'grey'
    if (typeof marking === 'object' && 'disabled' in marking && marking.disabled === true)
      return 'grey'
    return 'black'
  }

  return (
    <Box alignItems="center" position="relative" padding="s">
      <BorderlessButton onPress={() => onPress(date)} enabled={!isWeekend(day)}>
        <Box
          borderRadius="l"
          borderWidth={state === 'today' ? 2 : 0}
          backgroundColor={state === 'selected' ? 'black' : 'transparent'}
          width={26}
          height={26}
          justifyContent="center"
          alignItems="center"
          margin="s">
          <Text color={textColor()} fontFamily="Nunito-Bold" fontSize={15}>
            {date.day}
          </Text>
        </Box>
      </BorderlessButton>
      <Box position="absolute" top="100%">
        {dots.firstThree.map((dot: { key: string; color: string }) => (
          <Box
            key={dot.key}
            width={10}
            height={4}
            borderRadius="s"
            marginTop="xs"
            style={{ backgroundColor: dot.color }}
          />
        ))}
        {dots.isMore ? (
          <Box
            position="relative"
            width={4}
            height={4}
            backgroundColor="grey"
            borderRadius="s"
            top={-4}
            left={14}
          />
        ) : null}
      </Box>
    </Box>
  )
}
