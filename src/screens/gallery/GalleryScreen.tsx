import { Gallery } from 'components/Gallery/Gallery'
import { ModalNavigationProps } from 'navigation/types'
import React from 'react'

type GalleryScreenProps = ModalNavigationProps<'GALLERY'>

export const GalleryScreen = ({ route }: GalleryScreenProps) => <Gallery {...route.params} />
