import { ProgressBar } from 'components/ProgressBar'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import React, { useCallback, useRef } from 'react'
import {
  FlatList,
  ViewToken,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { AttachmentType } from 'types/holidaysDataTypes'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { isIos } from 'utils/layout'
import { Box } from 'utils/theme'
import { GalleryItem } from './GalleryItem'

type GalleryProps = {
  data: AttachmentType[]
  index?: number
  onIndexChanged?: F1<number>
  onItemPress?: F2<number, string>
  postId?: string
}

export const Gallery = ({ data, index = 0, onIndexChanged, onItemPress, postId }: GalleryProps) => {
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
    ({ item, index }: { item: AttachmentType; index: number }) => (
      <GalleryItem
        {...item}
        width={width}
        onPress={() => onItemPress && onItemPress(index, item.uri)}
      />
    ),
    [width, onItemPress]
  )

  return (
    <SafeAreaWrapper edges={['bottom']} isDefaultBgColor>
      <FlatList
        horizontal
        ref={listRef}
        snapToInterval={width}
        snapToAlignment="center"
        initialScrollIndex={index}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        decelerationRate="normal"
        disableIntervalMomentum
        contentContainerStyle={{ alignItems: 'center', paddingTop: 8 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.uri}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
      />
      {data.length > 1 && (
        <Box
          alignSelf="center"
          position="absolute"
          bottom={isIos && !isScreenHeightShort ? 40 : 10}>
          <ProgressBar
            postId={postId}
            scrollPositionX={translateX}
            slidersCount={data.length}
            postPagination
          />
        </Box>
      )}
    </SafeAreaWrapper>
  )
}

const viewabilityConfig = { waitForInteraction: true, viewAreaCoveragePercentThreshold: 95 }
