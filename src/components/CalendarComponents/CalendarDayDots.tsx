import React from 'react'
import { Box } from 'utils/theme'
import { MarkingType } from './CalendarTypes'

export const CalendarDayDots = ({ marking }: Partial<MarkingType>) => {
  const dots = {
    firstThree: marking?.dots?.slice(0, 3),
    isMore: marking && marking?.dots?.length > 3,
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
