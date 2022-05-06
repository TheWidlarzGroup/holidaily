import React from 'react'
import { Box, Text, theme } from 'utils/theme'
import { getDateWithMonthString } from 'utils/dates'
import { DayWeekend } from './DayWeekend'
import { DayEvent, DayOffEvent } from './DayEvent'

export type DayInfoProps = {
  date: string
  events?: DayOffEvent[]
  weekend?: number
}

const DAY_PADDING_VERTICAL = 'm'
const OUTER_BOX_MARGIN = 's'
const INNER_BOX_MARGIN = 's'
const HEADING_FONT_SIZE = 12
const FONT_OFFSET = 4
export const DAY_ITEM_HEIGHT =
  2 * theme.spacing[DAY_PADDING_VERTICAL] +
  2 * theme.spacing[OUTER_BOX_MARGIN] +
  theme.spacing[INNER_BOX_MARGIN] +
  HEADING_FONT_SIZE +
  FONT_OFFSET

export const DayInfo = ({ date, events, weekend }: DayInfoProps) => {
  if (weekend) return <DayWeekend date={date} weekend={weekend} />
  return (
    <Box
      borderRadius="lmin"
      backgroundColor="white"
      paddingVertical={DAY_PADDING_VERTICAL}
      paddingHorizontal="lplus"
      marginVertical={OUTER_BOX_MARGIN}>
      <Text variant="captionText">{getDateWithMonthString(date)}</Text>
      {typeof events !== 'undefined' && events?.length > 0 && (
        <Box marginTop={INNER_BOX_MARGIN}>
          {events.map((event) => (
            <DayEvent event={event} key={event.id} />
          ))}
        </Box>
      )}
    </Box>
  )
}
