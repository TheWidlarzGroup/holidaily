import { ProgressBar } from 'components/ProgressBar'
import React, { useCallback, useRef } from 'react'
import {
  FlatList,
  ViewToken,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { GalleryItemData } from 'types/holidaysDataTypes'
import { Box } from 'utils/theme'
import { GalleryItem } from './GalleryItem'

type GalleryProps = {
  data: GalleryItemData[]
  index?: number
  onIndexChanged?: F1<number>
  onItemPress?: F2<number, string>
}

export const Gallery = ({ data, index = 0, onIndexChanged, onItemPress }: GalleryProps) => {
  const { width } = useWindowDimensions()
  const listRef = useRef<FlatList>(null)
  const translateX = useSharedValue(0)

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const [item] = viewableItems
      if (item === undefined || item.index === null) return
      onIndexChanged?.(item.index)
    },
    [onIndexChanged]
  )
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xPos = event.nativeEvent.contentOffset.x
    translateX.value = xPos
  }

  const renderItem = useCallback(
    ({ item, index }: { item: GalleryItemData; index: number }) => (
      <GalleryItem
        {...item}
        width={width}
        onPress={() => onItemPress && onItemPress(index, item.src)}
      />
    ),
    [width, onItemPress]
  )

  return (
    <>
      <FlatList
        horizontal
        ref={listRef}
        initialScrollIndex={index}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        decelerationRate={0}
        snapToInterval={width}
        snapToAlignment="center"
        contentContainerStyle={{ alignItems: 'center' }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.src}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
      />
      {data.length > 1 && (
        <Box alignSelf="center" position="absolute" bottom={12}>
          <ProgressBar scrollPositionX={translateX} slidersCount={data.length} postPagination />
        </Box>
      )}
    </>
  )
}

const viewabilityConfig = { waitForInteraction: true, viewAreaCoveragePercentThreshold: 95 }
