import React, { useCallback } from 'react'
import { Box, Text, BaseOpacity } from 'utils/theme'
import { useTranslation } from 'react-i18next'

import IconCamera from 'assets/icons/icon-camera.svg'
import IconGallery from 'assets/icons/icon-gallery-2.svg'
import IconLocation from 'assets/icons/icon-pin.svg'
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import { FooterButton } from './FooterButton'

type PostFooterProps = {
  onLocationPress: F0
  onImagesPick: F1<Asset[]>
  onCTAPress: F0
  disabledCTA: boolean
}

export const PostFooter = ({
  onLocationPress,
  onCTAPress,
  onImagesPick,
  disabledCTA,
}: PostFooterProps) => {
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

  return (
    <Box
      bg="disabled"
      borderTopLeftRadius="l"
      borderTopRightRadius="l"
      position="relative"
      left={0}
      right={0}
      bottom={0}>
      <Box
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        paddingVertical="m">
        <FooterButton onPress={handleCameraPress} onLongPress={handleCameraLongPress}>
          <IconCamera />
        </FooterButton>
        <FooterButton onPress={handleGalleryPress}>
          <IconGallery />
        </FooterButton>
        <FooterButton onPress={onLocationPress}>
          <IconLocation />
        </FooterButton>
      </Box>
      <Box
        justifyContent="center"
        alignItems="stretch"
        paddingTop="xs"
        paddingBottom="l"
        paddingHorizontal="xxxl">
        <BaseOpacity
          paddingVertical="m"
          borderRadius="xxl"
          bg={disabledCTA ? 'headerGrey' : 'primary'}
          onPress={onCTAPress}
          disabled={disabledCTA}>
          <Text variant="buttonText1">{t('sendPost')}</Text>
        </BaseOpacity>
      </Box>
    </Box>
  )
}
