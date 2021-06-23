import React from 'react'
import { DayInfo, DayInfoProps } from 'screens/calendar/components/DayInfo'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'

export type EventsListProps = {
  days: DayInfoProps[]
}

export const EventsList = ({ days }: EventsListProps) => (
  <Box marginTop="m" flex={1}>
    <FlatList
      data={days}
      renderItem={({ item }) => (
        <DayInfo date={item.date} events={item.events} weekend={item.weekend} />
      )}
      keyExtractor={(item) => item.date}
    />
  </Box>
)
