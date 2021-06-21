import React from 'react'
import { Box, Text } from 'utils/theme'
import UserIconPlaceholder from 'assets/icons/icon-profile.svg'
import { getDateWithMonthString, getDayName } from 'utils/dates'
import { useTranslation } from 'react-i18next'
import { DateTime } from 'luxon'

export type DayOffEvent = {
  person: string
  reason: string
  position: string
  color: string
}

export type DayInfoProps = {
  date: string
  events?: DayOffEvent[]
  weekend?: number
}

export const DayInfo = ({ date, events, weekend }: DayInfoProps) => {
  const { i18n } = useTranslation()

  if (weekend)
    return (
      <Box
        paddingVertical="m"
        paddingHorizontal="lplus"
        borderColor="white"
        backgroundColor="disabled"
        justifyContent="space-between"
        flexDirection="row"
        borderTopRightRadius={weekend === 1 && 'lmin'}
        borderTopLeftRadius={weekend === 1 && 'lmin'}
        borderBottomRightRadius={weekend === 2 && 'lmin'}
        borderBottomLeftRadius={weekend === 2 && 'lmin'}
        borderBottomWidth={weekend === 1 && 1}
        marginTop={weekend === 1 && 's'}
        marginBottom={weekend === 2 && 's'}>
        <Text variant="regularWhite12">{getDateWithMonthString(date, i18n.language)}</Text>
        <Text variant="boldWhite12">{getDayName(date, i18n.language)}</Text>
      </Box>
    )
  return (
    <Box
      borderRadius="lmin"
      backgroundColor="white"
      paddingVertical="m"
      paddingHorizontal="lplus"
      marginVertical="s">
      <Text variant="captionText">{getDateWithMonthString(date, i18n.language)}</Text>
      {typeof events !== 'undefined' && events?.length > 0 && (
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
      )}
    </Box>
  )
}
