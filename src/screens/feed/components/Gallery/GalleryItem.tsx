import React from 'react'
import FastImage from 'react-native-fast-image'
import { FeedPostData } from 'screens/feed/types'
import { mkUseStyles } from 'utils/theme'

type GalleryItemProps = FeedPostData & {
  width: number
}

export const GalleryItem = ({ src, type, width }: GalleryItemProps) => {
  const styles = useStyles()

  return (
    <>
      {type === 'image' && (
        <FastImage style={[styles.image, { width }]} source={{ uri: src }} resizeMode="cover" />
      )}
    </>
  )
}

const useStyles = mkUseStyles(() => ({
  image: { aspectRatio: 4 / 5 },
}))
