import React from 'react'
import { Box } from 'utils/theme'
import { DayComponentProps } from 'react-native-calendars'

type CalendarDayDotsProps = Pick<DayComponentProps, 'marking'>

export const CalendarDayDots = ({ marking }: CalendarDayDotsProps) => {
  const dots = {
    firstThree: marking?.dots?.slice(0, 3),
    isMore: marking?.dots?.length > 3,
  }
  console.log(marking)
  return (
    <Box position="absolute" top="85%">
      {dots.firstThree?.map((dot: { key: string; color: string }) => (
        <Box
          key={dot.key}
          width={8}
          height={2}
          borderRadius="s"
          marginTop="xs"
          style={{ backgroundColor: dot.color }}
        />
      ))}
      {dots.isMore && (
        <Box
          position="relative"
          width={2}
          height={2}
          backgroundColor="grey"
          borderRadius="s"
          top={-2}
          left={10}
        />
      )}
    </Box>
  )
}
