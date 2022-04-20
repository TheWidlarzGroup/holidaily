import React from 'react'
import { Box, Text } from 'utils/theme'
import UserIconPlaceholder from 'assets/icons/icon-profile.svg'
import { Avatar } from 'components/Avatar'

export type DayOffEvent = {
  id: string
  person: string
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
    {event.photo ? (
      <Avatar src={event?.photo} size="m" />
    ) : (
      <UserIconPlaceholder width={24} height={24} />
    )}

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
