import { ProgressBar } from 'components/ProgressBar'
import React, { useCallback, useRef, useState } from 'react'
import {
  FlatList,
  ViewToken,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

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
  const { width: initialWidth } = useWindowDimensions()
  const [imageWidth, setImageWidth] = useState(initialWidth)
  const listRef = useRef<FlatList>(null)

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const [item] = viewableItems
      if (item === undefined || item.index === null) return
      onIndexChanged?.(item.index)
    },
    [onIndexChanged]
  )

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

  const renderItem = useCallback(
    ({ item, index }: { item: GalleryItemData; index: number }) => (
      <GalleryItem
        {...item}
        width={imageWidth}
        onPress={() => onItemPress && onItemPress(index, item.src)}
      />
    ),
    [imageWidth, onItemPress]
  )

  const [currentIndex, setCurrentIndex] = useState(0)

  const translateX = useSharedValue(0)

  console.log(currentIndex)

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width
    const xPos = event.nativeEvent.contentOffset.x
    translateX.value = xPos
    const current = Math.floor(xPos / totalWidth)
    if (current === -1) return setCurrentIndex(0)
    console.log('curr', current)
    setCurrentIndex(current)
  }

  return (
    <>
      <FlatList
        horizontal
        ref={listRef}
        initialScrollIndex={index}
        onLayout={(event) => setImageWidth(event.nativeEvent.layout.width)}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        getItemLayout={(_, index) => ({ length: imageWidth, offset: imageWidth * index, index })}
        decelerationRate={0}
        snapToInterval={imageWidth}
        snapToAlignment="center"
        contentContainerStyle={{ alignItems: 'center' }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.src}
        // onScroll={onScroll}
        onMomentumScrollEnd={onScroll}
        showsHorizontalScrollIndicator={false}
      />
      <Box
        alignItems="center"
        justifyContent="center"
        alignSelf="center"
        marginBottom="m"
        position="absolute"
        bottom={20}>
        <ProgressBar
          scrollPositionX={translateX}
          slidersCount={data.length}
          currentIndex={currentIndex}
        />
      </Box>
      {/* {data.length > 1 && (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          alignSelf="center"
          position="absolute"
          bottom={10}>
          {data.map((_, index) => {
            // let dotSize = 8
            const leftDotsToScrollOnRight = data.length - (currentIndex + 1)
            const leftDotsToScrollOnLeft = currentIndex

            if ((data.length >= 4 && currentIndex - index === 3) || currentIndex - index === -3) {
              // dotSize = 6
            }
            if ((data.length >= 4 && currentIndex - index >= 4) || currentIndex - index <= -4)
              return

            if (leftDotsToScrollOnRight >= 2 && currentIndex - index <= -3 && currentIndex !== 0)
              return
            if (
              leftDotsToScrollOnLeft > 2 &&
              currentIndex - index > 2 &&
              currentIndex !== data.length - 1
            )
              return
            if (
              leftDotsToScrollOnRight > 1 &&
              leftDotsToScrollOnLeft > 1 &&
              leftDotsToScrollOnRight > leftDotsToScrollOnLeft &&
              currentIndex - index >= 2
            )
              return
            if (
              leftDotsToScrollOnRight > 1 &&
              leftDotsToScrollOnLeft > 1 &&
              leftDotsToScrollOnRight < leftDotsToScrollOnLeft &&
              currentIndex - index <= -2
            )
              return
            return (
              // <Dot
              //   key={Math.random()}
              //   index={index}
              //   currentIndex={currentIndex}
              //   dataLen={data.length}
              // />
              <Box alignItems="center" justifyContent="center" alignSelf="center" marginBottom="m">
                <ProgressBar scrollPositionX={translateX} slidersCount={data.length} />
              </Box>
            )
          })}
        </Box>
      )} */}
    </>
  )
}

const viewabilityConfig = { waitForInteraction: true, viewAreaCoveragePercentThreshold: 95 }
