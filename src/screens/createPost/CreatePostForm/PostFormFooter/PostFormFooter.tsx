import React, { useCallback } from 'react'
import { Box } from 'utils/theme'

import IconCamera from 'assets/icons/icon-camera.svg'
import IconGallery from 'assets/icons/icon-gallery-2.svg'
import IconLocation from 'assets/icons/icon-pin.svg'
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import { useKeyboard } from 'hooks/useKeyboard'
import { FooterButton } from './FooterButton'

type PostFooterProps = {
  onLocationPress: F0
  onImagesPick: F1<Asset[]>
}

export const PostFormFooter = ({ onLocationPress, onImagesPick }: PostFooterProps) => {
  const [keyboardShown] = useKeyboard()

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
      backgroundColor="disabled"
      borderTopLeftRadius="l"
      borderTopRightRadius="l"
      flexDirection="row"
      justifyContent="space-evenly"
      alignItems="center"
      paddingVertical="m"
      style={{
        paddingBottom: keyboardShown ? 40 : 0,
      }}>
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
  )
}
