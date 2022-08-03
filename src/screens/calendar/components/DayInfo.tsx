import React from 'react'
import { Box, Spacing, Text, TextVariant, theme } from 'utils/theme'
import { getDayName, getReversedDateWithMonthString, isWeekend } from 'utils/dates'
import { DayEvent, EVENT_HEIGHT } from './DayEvent'
import { DayInfoProps } from '../../../types/DayInfoProps'

const DAY_PADDING_VERTICAL: Spacing = 'm'
const OUTER_BOX_MARGIN: Spacing = 's'
const HEADING_TEXT_VARIANT: TextVariant = 'captionText'
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
        paddingHorizontal="m"
        marginVertical={OUTER_BOX_MARGIN}>
        <Text variant={HEADING_TEXT_VARIANT} marginBottom="xxs">
          {getReversedDateWithMonthString(p.date)},{' '}
          <Text color="darkGrey">{getDayName(p.date)}</Text>
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
