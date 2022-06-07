import React from 'react'
import { Box, Text } from 'utils/theme'
import { getDateWithMonthString, getDayName, isWeekend } from 'utils/dates'
import { DayWeekend } from './DayWeekend'
import { DayEvent } from './DayEvent'
import { DayInfoProps } from '../../../types/DayInfoProps'

export const DayInfo = React.memo(
  (p: DayInfoProps) => {
    if (p.weekend) return <DayWeekend date={p.date} weekend={p.weekend} />
    return (
      <Box
        opacity={isWeekend(new Date(p.date)) ? 0.5 : 1}
        borderRadius="lmin"
        backgroundColor="white"
        paddingVertical="m"
        paddingHorizontal="lplus"
        marginVertical="s">
        <Text variant="captionText">
          {getDateWithMonthString(p.date)},{' '}
          <Text color="blackBrighterDouble">{getDayName(p.date)}</Text>
        </Text>
        {typeof p.events !== 'undefined' && p.events?.length > 0 && (
          <Box marginTop="s">
            {p.events.map((event) => (
              <DayEvent event={event} key={event.id} />
            ))}
          </Box>
        )}
      </Box>
    )
  },
  () => true
)
