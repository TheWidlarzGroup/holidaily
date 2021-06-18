import React from 'react'
import { Box } from 'utils/theme'
import { DayComponentProps } from 'react-native-calendars'

type CalendarDayDotsProps = Pick<DayComponentProps, 'marking'>

export const CalendarDayDots = ({ marking }: CalendarDayDotsProps) => {
  const dots = {
    firstThree: marking?.dots?.slice(0, 3),
    isMore: marking?.dots?.length > 3,
  }

  return (
    <Box position="absolute" top="100%">
      {dots.firstThree?.map((dot: { key: string; color: string }) => (
        <Box
          key={dot.key}
          width={10}
          height={4}
          borderRadius="s"
          marginTop="xs"
          style={{ backgroundColor: dot.color }}
        />
      ))}
      {dots.isMore && (
        <Box
          position="relative"
          width={4}
          height={4}
          backgroundColor="grey"
          borderRadius="s"
          top={-4}
          left={14}
        />
      )}
    </Box>
  )
}
