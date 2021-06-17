import React, { useRef, useState, useEffect } from 'react'
import { FlatList, useWindowDimensions, ViewToken } from 'react-native'
import { mkUseStyles, Text, BaseOpacity } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { useBooleanState } from 'hooks/useBooleanState'
import Modal from 'react-native-modal'

type GalleryItemData = {
  src: string
  type?: string
}

type GalleryProps = {
  data: GalleryItemData[]
}

// TODO: Set list size to cover only image -> Backdrop Exit form Modal

export const Gallery = ({ data }: GalleryProps) => {
  const [fullScreen, { setTrue: setFullScreen, setFalse: unsetFullScreen }] = useBooleanState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const listRef = useRef<FlatList | null>(null)

  const styles = useStyles()
  const { width: ITEM_WIDTH } = useWindowDimensions()

  useEffect(() => {
    listRef.current?.scrollToIndex({ index: imageIndex, animated: false })
  }, [fullScreen, imageIndex])

  const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const [item] = viewableItems
    if (!item?.index && item?.index !== 0) return
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
      style={styles.list}
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

type GalleryItemProps = GalleryItemData & {
  width: number
}

const GalleryItem = ({ src, type, width }: GalleryItemProps) => {
  const styles = useStyles()

  return (
    <>
      {type === 'image' ? (
        <FastImage
          style={[styles.image, { width }]}
          source={{ uri: src }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <Text>TODO: Video should be here</Text>
      )}
    </>
  )
}

// TODO: Add aspectRatio to theme

const useStyles = mkUseStyles(() => ({
  list: {},
  modal: { margin: 0 },
  image: { aspectRatio: 4 / 5 },
  contentContainer: {
    alignItems: 'center',
  },
}))
