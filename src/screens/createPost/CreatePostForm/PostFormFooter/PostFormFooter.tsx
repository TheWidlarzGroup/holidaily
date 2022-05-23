import React, { useCallback } from 'react'
import { Box, useTheme } from 'utils/theme'

import IconCamera from 'assets/icons/icon-camera.svg'
import IconGallery from 'assets/icons/icon-gallery-2.svg'
import IconLocation from 'assets/icons/icon-pin.svg'
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import { Alert } from 'react-native'
import { useKeyboard } from 'hooks/useKeyboard'
import { useLocation } from 'hooks/useLocation'
import { useTranslation } from 'react-i18next'
import { FooterButton } from './FooterButton'

type PostFooterProps = {
  onLocationPress: F0
  onImagesPick: F1<Asset[]>
  imagesCount: number
}

export const PostFormFooter = ({ onLocationPress, onImagesPick, imagesCount }: PostFooterProps) => {
  const [keyboardShown] = useKeyboard()
  const { t } = useTranslation('feed')
  const theme = useTheme()
  const { requestLocationPermission } = useLocation()

  const imagePickCallback = useCallback(
    (res: ImagePickerResponse) => {
      if (res.didCancel) return console.log('cancelled')
      if (res.errorCode) return console.log('Error:', res.errorCode)
      if (!res.assets) return console.warn(__DEV__ && 'empty assets')
      onImagesPick(res.assets)
    },
    [onImagesPick]
  )
  const handleCameraPress = () => {
    if (imagesCount >= 5) {
      return Alert.alert(t('exceededAmount'))
    }
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      imagePickCallback
    )
  }

  const handleCameraLongPress = () => {
    if (imagesCount >= 5) {
      return Alert.alert(t('exceededAmount'))
    }
    launchCamera(
      {
        mediaType: 'video',
        saveToPhotos: true,
      },
      imagePickCallback
    )
  }

  const handleGalleryPress = () => {
    if (imagesCount >= 5) {
      return Alert.alert(t('exceededAmount'))
    }
    launchImageLibrary(
      {
        mediaType: 'mixed',
      },
      imagePickCallback
    )
  }

  const handleRequestLocation = async () => {
    const granted = await requestLocationPermission()
    if (granted) return onLocationPress()
  }

  return (
    <Box
      backgroundColor="dropdownPicked"
      borderTopLeftRadius="l"
      borderTopRightRadius="l"
      flexDirection="row"
      justifyContent="space-evenly"
      alignItems="center"
      paddingVertical="m"
      style={{
        paddingBottom: keyboardShown ? 80 : 0,
      }}>
      <FooterButton onPress={handleCameraPress} onLongPress={handleCameraLongPress}>
        <IconCamera color={theme.colors.black} />
      </FooterButton>
      <FooterButton onPress={handleGalleryPress}>
        <IconGallery color={theme.colors.black} />
      </FooterButton>
      <FooterButton onPress={handleRequestLocation}>
        <IconLocation color={theme.colors.black} />
      </FooterButton>
    </Box>
  )
}
