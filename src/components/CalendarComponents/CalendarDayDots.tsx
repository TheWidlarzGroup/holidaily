import React from 'react'
import { Box } from 'utils/theme'
import { DotsMarking } from './CalendarTypes'

export const CalendarDayDots = ({ marking }: DotsMarking) => {
  const dots = {
    firstThree: marking?.dots?.slice(0, 3),
    isMore: marking?.dots?.length > 3,
  }
  return (
    <Box position="absolute" top="80%">
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
