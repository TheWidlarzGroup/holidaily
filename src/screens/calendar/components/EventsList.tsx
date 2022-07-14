import React from 'react'
import { DayInfo } from 'screens/calendar/components/DayInfo'
import { FlatList, TouchableOpacity } from 'react-native'
import { Box } from 'utils/theme'
import { useLanguage } from 'hooks/useLanguage'
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
    <Box justifyContent="center" flex={1} borderRadius="lmin">
      <Box marginHorizontal="xm">
        <FlatList
          data={days}
          renderItem={renderItem}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          updateCellsBatchingPeriod={300}
          windowSize={17}
          extraData={[days, language]}
          keyExtractor={(item) => item.date}
          initialScrollIndex={0}
          ref={flatListRef}
          onScrollToIndexFailed={() => {}}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      </Box>
    </Box>
  )
})
EventsList.displayName = 'EventsList'
