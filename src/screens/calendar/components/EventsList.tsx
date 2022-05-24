import React from 'react'
import { DayInfo, DAY_ITEM_HEIGHT } from 'screens/calendar/components/DayInfo'
import { FlatList, TouchableOpacity } from 'react-native'
import { Box } from 'utils/theme'
import { useLanguage } from 'hooks/useLanguage'
import { EVENT_HEIGHT } from './DayEvent'
import { DayInfoProps } from '../../../types/DayInfoProps'

export type EventsListProps = {
  days: DayInfoProps[]
}

const renderItem = ({ item }: { item: DayInfoProps }) => (
  <TouchableOpacity activeOpacity={1} key={item.date}>
    <DayInfo date={item.date} events={item.events} weekend={item.weekend} />
  </TouchableOpacity>
)

export const EventsList = React.forwardRef<FlatList, EventsListProps>(({ days }, flatListRef) => {
  const [language] = useLanguage()
  return (
    <Box marginTop="m" marginHorizontal="xm" justifyContent="center" flex={1}>
      <FlatList
        data={days}
        renderItem={renderItem}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        updateCellsBatchingPeriod={300}
        extraData={[days, language]}
        keyExtractor={(item) => item.date}
        initialScrollIndex={0}
        getItemLayout={getItemLayout}
        windowSize={5}
        ref={flatListRef}
        onScrollToIndexFailed={() => {}}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </Box>
  )
})
EventsList.displayName = 'EventsList'

export const getItemLayout = (data: DayInfoProps[] | null | undefined, index: number) => {
  if (!data)
    return {
      length: DAY_ITEM_HEIGHT,
      offset: DAY_ITEM_HEIGHT * index,
      index,
    }
  let prevEventsCount = 0
  for (let i = 0; i < index; i++) {
    prevEventsCount += data[i]?.events?.length ? data[i].events?.length || 0 : 0
  }
  return {
    length: DAY_ITEM_HEIGHT,
    offset: index * DAY_ITEM_HEIGHT + prevEventsCount * EVENT_HEIGHT,
    index,
  }
}
