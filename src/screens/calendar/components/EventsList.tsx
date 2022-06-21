import React, { useState } from 'react'
import { DayInfo, DAY_ITEM_HEIGHT } from 'screens/calendar/components/DayInfo'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity } from 'react-native'
import { Box } from 'utils/theme'
import { useLanguage } from 'hooks/useLanguage'
import { EVENT_HEIGHT } from './DayEvent'
import { DayInfoProps } from '../../../types/DayInfoProps'
import { GoUpDownButton } from './GoUpDownButton'

export type EventsListProps = {
  btnOnPress: F0
  currentIndex: number
  days: DayInfoProps[]
  switchCalendarHeight: boolean
  setSwitchCalendarHeight: F1<boolean>
}

const renderItem = ({ item }: { item: DayInfoProps }) => (
  <TouchableOpacity activeOpacity={1} key={item.date}>
    <DayInfo date={item.date} events={item.events} weekend={item.weekend} />
  </TouchableOpacity>
)

export const EventsList = React.forwardRef<FlatList, EventsListProps>(
  (
    { days, switchCalendarHeight, setSwitchCalendarHeight, btnOnPress, currentIndex },
    flatListRef
  ) => {
    const [pageOffsetY, setPageOffsetY] = useState(0)
    const [language] = useLanguage()

    const handleTouchAndScroll = () => {
      if (switchCalendarHeight) setSwitchCalendarHeight(false)
    }

    const measureScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = e.nativeEvent.contentOffset
      setPageOffsetY(y)
    }

    const { offset } = getItemLayout(days, currentIndex)

    const btnShownCondition = pageOffsetY !== offset
    const arrowDirection = pageOffsetY > offset ? 'up' : 'down'
    const handleBtn = () => {
      if (switchCalendarHeight) {
        setSwitchCalendarHeight(false)
        setTimeout(() => {
          btnOnPress()
        }, 1000)
      } else {
        btnOnPress()
      }
    }

    return (
      <Box marginTop="7xl" marginHorizontal="xm" justifyContent="center" flex={1}>
        <FlatList
          data={days}
          renderItem={renderItem}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={300}
          windowSize={17}
          extraData={[days, language]}
          keyExtractor={(item) => item.date}
          initialScrollIndex={new Date().getDate() - 1}
          getItemLayout={getItemLayout}
          ref={flatListRef}
          onTouchEnd={handleTouchAndScroll}
          onScrollBeginDrag={handleTouchAndScroll}
          onScroll={(e) => measureScroll(e)}
          onScrollToIndexFailed={() => console.error('EventList scrollTo failed')}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
        {btnShownCondition && (
          <GoUpDownButton onPress={handleBtn} arrowDirection={arrowDirection} />
        )}
      </Box>
    )
  }
)
EventsList.displayName = 'EventsList'

// Comment: Entirely removing getItemLayout cause the EventList scrollTo to fail for some time after initial render, because the flatlist is performing measurment by itself.
export const getItemLayout = (data: DayInfoProps[] | null | undefined, index: number) => {
  if (!data)
    return {
      length: DAY_ITEM_HEIGHT,
      offset: DAY_ITEM_HEIGHT * index,
      index,
    }
  let prevEventsCount = 0
  for (let i = 0; i < index; i++) {
    prevEventsCount += data[i].events?.length ?? 0
  }
  return {
    length: DAY_ITEM_HEIGHT,
    offset: index * DAY_ITEM_HEIGHT + prevEventsCount * EVENT_HEIGHT,
    index,
  }
}
