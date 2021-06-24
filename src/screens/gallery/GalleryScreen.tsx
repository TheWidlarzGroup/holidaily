import { Gallery } from 'components/Gallery/Gallery'
import { ModalNavigationProps } from 'navigation/types'
import React from 'react'

type GalleryScreenProps = ModalNavigationProps<'Gallery'>

export const GalleryScreen = ({ navigation, route }: GalleryScreenProps) => {
  const handleGalleryItemPress = () => {
    navigation.goBack()
  }

  return <Gallery {...route.params} onItemPress={handleGalleryItemPress} />
}
