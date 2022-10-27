import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { BaseOpacity } from 'utils/theme'
import { ViewStyle } from 'react-native'
import { AttachmentDataType } from 'mockApi/models/miragePostTypes'
import { SkeletonLoader } from 'components/SkeletonLoader'
import { sleep } from 'utils/sleep'

type GalleryItemProps = AttachmentDataType & {
  width: number
  onPress: F0
  style: ViewStyle
}

export const GalleryItem = ({ uri, width, onPress, style }: GalleryItemProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const onImageLoadEnd = async () => {
    await sleep(500)
    setIsLoading(false)
  }

  return (
    <BaseOpacity onPress={onPress} activeOpacity={1} style={style}>
      <SkeletonLoader width={width} isLoading={isLoading}>
        <FastImage
          style={{ aspectRatio: 4 / 5, width }}
          source={{ uri }}
          resizeMode="cover"
          onLoadEnd={onImageLoadEnd}
        />
      </SkeletonLoader>
    </BaseOpacity>
  )
}
