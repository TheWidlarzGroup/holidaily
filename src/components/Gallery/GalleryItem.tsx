import React from 'react'
import FastImage from 'react-native-fast-image'
import { BaseOpacity } from 'utils/theme'
import { AttachmentType } from 'types/holidaysDataTypes'
import { ViewStyle } from 'react-native'

type GalleryItemProps = AttachmentType & {
  width: number
  onPress: F0
  style: ViewStyle
}

export const GalleryItem = ({ uri, width, onPress, style }: GalleryItemProps) => (
  <BaseOpacity onPress={onPress} activeOpacity={1} style={style}>
    <FastImage style={{ aspectRatio: 4 / 5, width }} source={{ uri }} resizeMode="cover" />
  </BaseOpacity>
)
