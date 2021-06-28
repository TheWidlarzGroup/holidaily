import React, { useCallback } from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'

import IconCamera from 'assets/icons/icon-camera.svg'
import IconGallery from 'assets/icons/icon-gallery.svg'
import IconLocation from 'assets/icons/icon-pin.svg'
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'

type PostFooterProps = {
  onImagesPick: F1<Asset[]>
  onCTAPress: F0
}

export const PostFooter = ({ onCTAPress, onImagesPick }: PostFooterProps) => {
  const { t } = useTranslation('createPost')

  const imagePickCallback = useCallback(
    (res: ImagePickerResponse) => {
      if (res.didCancel) return console.log('cancelled')
      if (res.errorCode) return console.log('Error:', res.errorCode)
      onImagesPick(res.assets)
    },
    [onImagesPick]
  )

  const handleCameraPress = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      imagePickCallback
    )
  }

  const handleCameraLongPress = () => {
    launchCamera(
      {
        mediaType: 'video',
        saveToPhotos: true,
      },
      imagePickCallback
    )
  }

  const handleGalleryPress = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
      },
      imagePickCallback
    )
  }

  const handleLocationPress = () => {}

  return (
    <Box bg="rippleColor" borderTopLeftRadius="l" borderTopRightRadius="l">
      <Box flexDirection="row" justifyContent="space-evenly" alignItems="center">
        <BaseOpacity padding="m" onPress={handleCameraPress} onLongPress={handleCameraLongPress}>
          <IconCamera />
        </BaseOpacity>
        <BaseOpacity padding="m" onPress={handleGalleryPress}>
          <IconGallery />
        </BaseOpacity>
        <BaseOpacity padding="m" onPress={handleLocationPress}>
          <IconLocation />
        </BaseOpacity>
      </Box>
      <Box
        justifyContent="center"
        alignItems="stretch"
        paddingTop="xs"
        paddingBottom="l"
        paddingHorizontal="xxxl">
        <BaseOpacity paddingVertical="m" borderRadius="xxl" bg="primary" onPress={onCTAPress}>
          <Text variant="buttonText1">{t('sendPost')}</Text>
        </BaseOpacity>
      </Box>
    </Box>
  )
}
