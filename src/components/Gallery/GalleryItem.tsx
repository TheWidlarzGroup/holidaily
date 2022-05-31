import React from 'react'
import FastImage from 'react-native-fast-image'
import { BaseOpacity } from 'utils/theme'
import { AttachmentType } from 'types/holidaysDataTypes'

type GalleryItemProps = AttachmentType & {
  width: number
  onPress: F0
}

export const GalleryItem = ({ uri, width, onPress }: GalleryItemProps) => (
  <BaseOpacity onPress={onPress} activeOpacity={1}>
    <FastImage style={{ aspectRatio: 4 / 5, width }} source={{ uri }} resizeMode="cover" />
  </BaseOpacity>
)
