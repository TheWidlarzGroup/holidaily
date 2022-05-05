import { ProgressBar } from 'components/ProgressBar'
import React, { useCallback, useRef, useState } from 'react'
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
  const [currentIndex, setCurrentIndex] = useState(0)
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
    const totalWidth = event.nativeEvent.layoutMeasurement.width
    const xPos = event.nativeEvent.contentOffset.x
    translateX.value = xPos
    const current = Math.floor(xPos / totalWidth)
    if (current === -1) return setCurrentIndex(0)
    setCurrentIndex(current)
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

  // TODO:
  // 1) If 1 image don't show dots
  // 2) show alert/modal if user tries to add more thatn 5 images during post creation
  // 3) Adjust dots position in Holifeed

  return (
    <>
      <FlatList
        horizontal
        ref={listRef}
        initialScrollIndex={index}
        // onLayout={(event) => setImageWidth(event.nativeEvent.layout.width)}
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
      <Box
        alignItems="center"
        justifyContent="center"
        alignSelf="center"
        marginBottom="m"
        position="absolute"
        bottom={true ? 0 : 0}>
        <ProgressBar
          scrollPositionX={translateX}
          slidersCount={data.length}
          currentIndex={currentIndex}
        />
      </Box>
    </>
  )
}

const viewabilityConfig = { waitForInteraction: true, viewAreaCoveragePercentThreshold: 95 }
