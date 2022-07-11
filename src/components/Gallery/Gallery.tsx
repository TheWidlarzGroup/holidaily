import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { ProgressBar } from 'components/ProgressBar'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import React, { useCallback, useRef } from 'react'
import {
  ViewToken,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { AttachmentType } from 'types/holidaysDataTypes'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { isIos } from 'utils/layout'
import { Box } from 'utils/theme'
import { GalleryItem } from './GalleryItem'

type GalleryProps = {
  data: AttachmentType[]
  index?: number
  onIndexChanged?: F1<number>
  onItemPress?: F2<number, string>
  postId?: string
  fullScreenPicture?: true
}

export const Gallery = ({
  data,
  index = 0,
  onIndexChanged,
  onItemPress,
  postId,
  fullScreenPicture,
}: GalleryProps) => {
  const { width } = useWindowDimensions()
  const listRef = useRef<FlashList<AttachmentType>>(null)
  const translateX = useSharedValue(0)
  const navigation = useNavigation()

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
        style={{ paddingTop: 8, justifyContent: 'center', height: '100%' }}
      />
    ),
    [width, onItemPress]
  )

  const flatListComponent = (
    <FlashList
      horizontal
      ref={listRef}
      snapToInterval={width}
      snapToAlignment="center"
      initialScrollIndex={index}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      estimatedItemSize={width}
      decelerationRate="normal"
      disableIntervalMomentum
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.uri}
      onScroll={onScroll}
      showsHorizontalScrollIndicator={false}
    />
  )

  return (
    <SafeAreaWrapper edges={['bottom']} isDefaultBgColor>
      {fullScreenPicture ? (
        <GestureRecognizer
          onSwipeDown={() => navigation.goBack()}
          onSwipeUp={() => navigation.goBack()}
          onFailed={() => navigation.goBack()}>
          {flatListComponent}
        </GestureRecognizer>
      ) : (
        flatListComponent
      )}

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
