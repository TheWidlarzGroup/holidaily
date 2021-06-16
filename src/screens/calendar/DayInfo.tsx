import React from 'react'
import { Box, Text } from 'utils/theme'
import { Image } from 'react-native'
import UserIconPlaceholder from 'assets/icons/icon-profile.svg'

type DayOffEvent = {
  person: string
  reason: string
  position: string
  color: string
}

type DayInfoProps = {
  date: `${number}${number}${number}${number}-${number}${number}-${number}${number}`
  events: DayOffEvent[]
}

export const DayInfo = ({ date, events }: DayInfoProps) => {
  return (
    <Box
      borderRadius="lmin"
      backgroundColor="white"
      paddingVertical="m"
      paddingHorizontal="lplus"
      marginVertical="s">
      <Text>{date}</Text>
      <Box marginTop="s">
        {events.map((event) => (
          <Box paddingVertical="s" flexDirection="row" alignItems="center" key={event.person}>
            <UserIconPlaceholder width={24} height={24} />
            <Box
              marginHorizontal="s"
              width={3}
              height={24}
              borderRadius="s"
              style={{ backgroundColor: event.color }}
            />
            <Box>
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
        ))}
      </Box>
    </Box>
  )
}
