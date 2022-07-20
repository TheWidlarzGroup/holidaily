import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { ProgressBar } from 'components/ProgressBar'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { NativeScrollEvent, NativeSyntheticEvent, StatusBar, ViewToken } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { isScreenHeightShort, windowHeight, windowWidth } from 'utils/deviceSizes'
import { isIos } from 'utils/layout'
import { BaseOpacity, Box } from 'utils/theme'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { useGetActiveRouteName } from 'utils/useGetActiveRouteName'
import { AttachmentDataType } from 'mockApi/models'
import { ScrollView } from 'react-native-gesture-handler'
import { GalleryItem } from './GalleryItem'

type GalleryProps = {
  data: AttachmentDataType[]
  index?: number
  onIndexChanged?: F1<number>
  onItemPress?: F2<number, string>
  postId?: string
}

const IMAGE_HEIGHT = (windowWidth * 4) / 3
const PADDING_TO_CENTER_IMG = (windowHeight - IMAGE_HEIGHT) / 2

export const Gallery = ({ data, index = 0, onIndexChanged, onItemPress, postId }: GalleryProps) => {
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
        width={windowWidth}
        onPress={() => onItemPress && onItemPress(index, item.uri)}
        style={{ justifyContent: 'center' }}
      />
    ),
    [onItemPress]
  )

  const flatListComponent = (
    <FlashList
      horizontal
      ref={listRef}
      snapToInterval={windowWidth}
      snapToAlignment="center"
      initialScrollIndex={index}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      estimatedItemSize={windowWidth}
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
          onPress={() => isIos && navigation.goBack()}>
          <ScrollView
            contentContainerStyle={{
              // Comment: it's not possible to center image, so paddingTop is used to do that
              paddingTop: PADDING_TO_CENTER_IMG,
              flex: 1,
            }}
            onScrollEndDrag={() => isIos && navigation.goBack()}
            onEnded={() => navigation.goBack()}>
            {flatListComponent}
          </ScrollView>
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
