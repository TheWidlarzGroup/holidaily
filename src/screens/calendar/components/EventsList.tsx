import React from 'react'
import { DayInfo, DayInfoProps } from 'screens/calendar/components/DayInfo'
import { FlatList } from 'react-native'

export type EventsListProps = {
  days: DayInfoProps[]
}

export const EventsList = ({ days }: EventsListProps) => (
  <FlatList
    data={days}
    renderItem={({ item }) => (
      <DayInfo date={item.date} events={item.events} weekend={item.weekend} />
    )}
    keyExtractor={(item) => item.date}
  />
)
