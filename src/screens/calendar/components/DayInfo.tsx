import React from 'react'
import { Box, Text, theme } from 'utils/theme'
import { getDateWithMonthString, getDayName, isWeekend } from 'utils/dates'
import { DayEvent, EVENT_HEIGHT } from './DayEvent'
import { DayInfoProps } from '../../../types/DayInfoProps'

const DAY_PADDING_VERTICAL = 'm'
const OUTER_BOX_MARGIN = 's'
const HEADING_TEXT_VARIANT = 'captionText'
const FONT_OFFSET = 4
// Comment: used to determine container flatlist scroll offset
export const DAY_ITEM_HEIGHT =
  2 * theme.spacing[DAY_PADDING_VERTICAL] +
  2 * theme.spacing[OUTER_BOX_MARGIN] +
  theme.textVariants[HEADING_TEXT_VARIANT].fontSize +
  FONT_OFFSET

// Comment: Please, if you change the views of this component, make sure that you didn't break the EventList scrollTo in Calendar.tsx, as it uses getItemLayout to avoid lag on initial render.
export const DayInfo = React.memo(
  (p: DayInfoProps) => {
    const baseDayContainerHeight = DAY_ITEM_HEIGHT - 2 * theme.spacing[OUTER_BOX_MARGIN]
    const eventListHeight = p.events?.length ? p.events.length * EVENT_HEIGHT : 0
    const dayContainerHeight = baseDayContainerHeight + eventListHeight
    return (
      <Box
        height={dayContainerHeight}
        opacity={isWeekend(new Date(p.date)) ? 0.5 : 1}
        borderRadius="lmin"
        backgroundColor="white"
        paddingVertical={DAY_PADDING_VERTICAL}
        paddingHorizontal="lplus"
        marginVertical={OUTER_BOX_MARGIN}>
        <Text variant={HEADING_TEXT_VARIANT}>
          {getDateWithMonthString(p.date)},{' '}
          <Text color="blackBrighterDouble">{getDayName(p.date)}</Text>
        </Text>
        {typeof p.events !== 'undefined' && p.events?.length > 0 && (
          <Box>
            {p.events.map((event) => (
              <DayEvent event={event} key={event.id} />
            ))}
          </Box>
        )}
      </Box>
    )
  },
  (prev, next) => {
    if ((prev.events ?? []).length !== (next.events ?? []).length) return false
    return true
  }
)
