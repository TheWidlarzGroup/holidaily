import React from 'react'
import { Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'

export type DayOffEvent = {
  id: string
  person: string
  personLastName?: string
  reason: string
  position: string
  color: string
  categoryId: number
  photo: string | null
  date: string
  monthYear?: string
}

type DayEventProps = { event: DayOffEvent }

export const DayEvent = ({ event }: DayEventProps) => (
  <Box paddingVertical="s" flexDirection="row" alignItems="center" key={event.person}>
    <Avatar
      src={event?.photo}
      userDetails={{
        userColor: event.color,
        firstName: event.person,
        lastName: event.personLastName,
      }}
      size="s"
    />
    <Box
      marginHorizontal="s"
      width={3}
      height={24}
      borderRadius="s"
      style={{ backgroundColor: event.color }}
    />
    <Box style={{ marginTop: 1 }}>
      <Box flexDirection="row" alignItems="center">
        <Text fontSize={12} fontFamily="Nunito-Bold" lineHeight={14}>
          {`${event.person}: `}
        </Text>
        <Text fontSize={12} fontFamily="Nunito-Regular" lineHeight={14}>
          {event.reason}
        </Text>
      </Box>
      <Text fontSize={12} fontFamily="Nunito-Regular" lineHeight={14} color="grey">
        {event.position}
      </Text>
    </Box>
  </Box>
)
