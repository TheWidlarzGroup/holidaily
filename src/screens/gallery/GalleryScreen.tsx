import { Gallery } from 'components/Gallery/Gallery'
import { ModalNavigationProps } from 'navigation/types'
import React from 'react'
import GestureRecognizer from 'react-native-swipe-gestures'
import { BaseOpacity } from 'utils/theme'

type GalleryScreenProps = ModalNavigationProps<'GALLERY'>

export const GalleryScreen = ({ navigation, route }: GalleryScreenProps) => (
  <GestureRecognizer
    onSwipeDown={() => navigation.goBack()}
    onSwipeUp={() => navigation.goBack()}
    style={{ flex: 1 }}>
    <BaseOpacity flex={1} activeOpacity={1} onPress={() => navigation.goBack()}>
      <Gallery {...route.params} />
    </BaseOpacity>
  </GestureRecognizer>
)
