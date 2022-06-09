import React from 'react'
import { Box, Spacing, Text, theme } from 'utils/theme'
import { Avatar, AvatarSize, avatarSizes } from 'components/Avatar'

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

const EVENT_VERTICAL_PADDING: Spacing = 's'
const AVATAR_SIZE: AvatarSize = 's'
// Comment: used to determine container flatlist scroll offset
export const EVENT_HEIGHT = theme.spacing[EVENT_VERTICAL_PADDING] * 2 + avatarSizes[AVATAR_SIZE]

// Comment: Please, if you change the views of this component, make sure that you didn't break the EventList scrollTo in Calendar.tsx, as it uses getItemLayout to avoid lag on initial render.
export const DayEvent = ({ event }: DayEventProps) => (
  <Box
    height={EVENT_HEIGHT}
    paddingVertical={EVENT_VERTICAL_PADDING}
    flexDirection="row"
    alignItems="center"
    key={event.person}>
    <Avatar
      src={event?.photo}
      userDetails={{
        userColor: event.color,
        firstName: event.person,
        lastName: event.personLastName,
      }}
      size="m"
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
        <Text fontSize={12} fontFamily="Nunito-Bold" lineHeight={18} color="blackBrighter">
          {`${event.person}: `}
        </Text>
        <Text fontSize={12} fontFamily="Nunito-Regular" lineHeight={18} color="blackBrighter">
          {event.reason}
        </Text>
      </Box>
      <Text fontSize={12} fontFamily="Nunito-Regular" lineHeight={18} color="darkGreyBrighter">
        {event.position}
      </Text>
    </Box>
  </Box>
)
