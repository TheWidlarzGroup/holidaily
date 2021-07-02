import React from 'react'
import { DayInfo, DayInfoProps } from 'screens/calendar/components/DayInfo'
import { FlatList } from 'react-native'
import { Box } from 'utils/theme'

export type EventsListProps = {
  days: DayInfoProps[]
}
const ITEM_HEIGHT = 49.9 + 16
const WEEKEND_HEIGHT = 50.5 + 5
const EVENT_HEIGHT = 46
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
      getItemLayout={(data, index) => {
        if (!data)
          return {
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          }
        let prevEventsCount = 0
        let prevWeekendsCount = 0
        for (let i = 0; i < index; i++) {
          prevEventsCount += data[i].events?.length ? data[i].events?.length : 0
          prevWeekendsCount += data[i].weekend ? 1 : 0
        }
        return {
          length: ITEM_HEIGHT,
          offset:
            index * ITEM_HEIGHT +
            prevEventsCount * EVENT_HEIGHT -
            prevWeekendsCount * ITEM_HEIGHT +
            prevWeekendsCount * WEEKEND_HEIGHT,
          index,
        }
      }}
      onScrollToIndexFailed={() => {}}
      windowSize={5}
      ref={flatListRef}
    />
  </Box>
))
EventsList.displayName = 'EventsList'
