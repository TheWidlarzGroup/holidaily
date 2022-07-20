import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { ProgressBar } from 'components/ProgressBar'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import React, { useCallback, useEffect, useRef } from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  useWindowDimensions,
  ViewToken,
} from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { isIos } from 'utils/layout'
import { BaseOpacity, Box } from 'utils/theme'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { useGetActiveRouteName } from 'utils/useGetActiveRouteName'
import { AttachmentDataType } from 'mockApi/models'
import { GalleryItem } from './GalleryItem'

type GalleryProps = {
  data: AttachmentDataType[]
  index?: number
  onIndexChanged?: F1<number>
  onItemPress?: F2<number, string>
  postId?: string
}

export const Gallery = ({ data, index = 0, onIndexChanged, onItemPress, postId }: GalleryProps) => {
  const { width } = useWindowDimensions()
  const listRef = useRef<FlashList<AttachmentDataType>>(null)
  const translateX = useSharedValue(0)
  const navigation = useNavigation()
  const { userSettings } = useUserSettingsContext()
  const activeRouteName = useGetActiveRouteName()

  useEffect(() => {
    if (activeRouteName === 'GALLERY') StatusBar.setBarStyle('light-content')
    else StatusBar.setBarStyle(userSettings?.darkMode ? 'light-content' : 'dark-content')
  }, [activeRouteName, userSettings?.darkMode])

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const [item] = viewableItems
      if (!item || item.index === null) return
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
    ({ item, index }: { item: AttachmentDataType; index: number }) => (
      <GalleryItem
        {...item}
        width={width}
        onPress={() => onItemPress && onItemPress(index, item.uri)}
        style={{ justifyContent: 'center' }}
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
      {activeRouteName === 'GALLERY' ? (
        <BaseOpacity
          justifyContent="center"
          alignItems="center"
          flex={1}
          activeOpacity={1}
          onPress={() => navigation.goBack()}>
          <GestureRecognizer
            style={{
              flex: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: (width * 4) / 3,
            }}
            onSwipeDown={() => navigation.goBack()}
            onSwipeUp={() => navigation.goBack()}>
            {flatListComponent}
          </GestureRecognizer>
        </BaseOpacity>
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
