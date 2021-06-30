import React from 'react'
import { DayInfo, DayInfoProps } from 'screens/calendar/components/DayInfo'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'

export type EventsListProps = {
  days: DayInfoProps[]
}

export const EventsList = React.forwardRef<FlatList, EventsListProps>(({ days }, flatListRef) => (
  <Box marginTop="m" flex={1}>
    <FlatList
      data={days}
      renderItem={({ item }) => (
        <DayInfo date={item.date} events={item.events} weekend={item.weekend} />
      )}
      extraData={days}
      keyExtractor={(item) => item.date}
      initialScrollIndex={0}
      initialNumToRender={days.length}
      onScrollToIndexFailed={() => {}}
      ref={flatListRef}
    />
  </Box>
))
EventsList.displayName = 'EventsList'
