import { Gallery } from 'components/Gallery/Gallery'
import { ModalNavigationProps } from 'navigation/types'
import React from 'react'
import { BaseOpacity } from 'utils/theme'

type GalleryScreenProps = ModalNavigationProps<'GALLERY'>

export const GalleryScreen = ({ navigation, route }: GalleryScreenProps) => (
  <BaseOpacity flex={1} activeOpacity={1} onPress={() => navigation.goBack()}>
    <Gallery {...route.params} fullScreenPicture />
  </BaseOpacity>
)
