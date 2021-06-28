import React, { useCallback, useRef, useState } from 'react'
import { FlatList, ViewToken, useWindowDimensions } from 'react-native'

import { GalleryItemData } from 'types/holidaysDataTypes'
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

  return (
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
    />
  )
}

const viewabilityConfig = { waitForInteraction: true, viewAreaCoveragePercentThreshold: 95 }
