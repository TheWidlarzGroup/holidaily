import React from 'react'
import FastImage from 'react-native-fast-image'
import { BaseOpacity } from 'utils/theme'
import { ViewStyle } from 'react-native'
import { AttachmentDataType } from 'mockApi/models/miragePostTypes'

type GalleryItemProps = AttachmentDataType & {
  width: number
  onPress: F0
  style: ViewStyle
}

export const GalleryItem = ({ uri, width, onPress, style }: GalleryItemProps) => (
  <BaseOpacity onPress={onPress} activeOpacity={1} style={style}>
    <FastImage style={{ aspectRatio: 4 / 5, width }} source={{ uri }} resizeMode="cover" />
  </BaseOpacity>
)
