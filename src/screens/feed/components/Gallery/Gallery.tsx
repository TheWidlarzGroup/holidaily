import React, { useRef, useState, useEffect } from 'react'
import { FlatList, useWindowDimensions, ViewToken } from 'react-native'
import { mkUseStyles, BaseOpacity } from 'utils/theme'

import { useBooleanState } from 'hooks/useBooleanState'
import Modal from 'react-native-modal'
import { FeedPost } from 'screens/feed/types'
import { GalleryItem } from './GalleryItem'

type GalleryProps = Pick<FeedPost, 'data'>

// TODO: Set list size to cover only image -> Backdrop Exit form Modal

export const Gallery = ({ data }: GalleryProps) => {
  const [fullScreen, { setTrue: setFullScreen, setFalse: unsetFullScreen }] = useBooleanState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const listRef = useRef<FlatList>(null)

  const styles = useStyles()
  const { width: ITEM_WIDTH } = useWindowDimensions()

  useEffect(() => {
    listRef.current?.scrollToIndex({ index: imageIndex, animated: false })
  }, [fullScreen, imageIndex])

  const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const [item] = viewableItems
    if (item === undefined || item.index === null) return
    setImageIndex(item.index)
  }

  const List = () => (
    <FlatList
      ref={listRef}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
      getItemLayout={(_, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
      horizontal
      decelerationRate={0}
      snapToInterval={ITEM_WIDTH}
      snapToAlignment="center"
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={({ item }) => (
        <BaseOpacity onPress={setFullScreen} activeOpacity={1}>
          <GalleryItem {...item} width={ITEM_WIDTH} />
        </BaseOpacity>
      )}
      keyExtractor={(item) => item.src}
    />
  )

  return (
    <>
      {fullScreen ? (
        <Modal
          isVisible
          style={styles.modal}
          onBackButtonPress={unsetFullScreen}
          onBackdropPress={unsetFullScreen}>
          <List />
        </Modal>
      ) : (
        <List />
      )}
    </>
  )
}

const useStyles = mkUseStyles(() => ({
  modal: { margin: 0 },
  contentContainer: {
    alignItems: 'center',
  },
}))
