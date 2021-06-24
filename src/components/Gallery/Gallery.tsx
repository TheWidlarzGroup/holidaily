import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, ViewToken } from 'react-native'
import { mkUseStyles } from 'utils/theme'

import { GalleryItem } from './GalleryItem'
import { GalleryItemData } from './types'

type GalleryProps = {
  data: GalleryItemData[]
  index?: number
  onIndexChanged?: F1<number>
  onItemPress?: F2<number, string>
}

// TODO: Set list size to cover only image -> Backdrop Exit form Modal

export const Gallery = ({ data, index = 0, onIndexChanged, onItemPress }: GalleryProps) => {
  const [imageWidth, setImageWidth] = useState(0)
  const listRef = useRef<FlatList>(null)
  const styles = useStyles()

  useEffect(() => {
    listRef.current?.scrollToIndex({ index, animated: false })
  }, [index])

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const [item] = viewableItems
      if (item === undefined || item.index === null) return
      if (onIndexChanged) onIndexChanged(item.index)
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
      onLayout={(event) => setImageWidth(event.nativeEvent.layout.width)}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      getItemLayout={(_, index) => ({ length: imageWidth, offset: imageWidth * index, index })}
      decelerationRate={0}
      snapToInterval={imageWidth}
      snapToAlignment="center"
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.src}
    />
  )
}

const viewabilityConfig = { waitForInteraction: true, viewAreaCoveragePercentThreshold: 95 }

const useStyles = mkUseStyles(() => ({
  modal: { margin: 0 },
  contentContainer: {
    alignItems: 'center',
  },
}))
