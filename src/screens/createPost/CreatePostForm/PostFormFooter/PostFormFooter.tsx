import React, { useCallback, useMemo } from 'react'
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
import { useKeyboard } from 'hooks/useKeyboard'
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
  const [keyboardShown, keyboardEvent] = useKeyboard()
  const keyboardOffset = useMemo(() => {
    if (keyboardEvent && keyboardEvent !== true) return keyboardEvent.endCoordinates.height
    return 0
  }, [keyboardEvent])
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
    <>
      <Box
        backgroundColor="disabled"
        borderTopLeftRadius="l"
        borderTopRightRadius="l"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        paddingVertical="m"
        width="100%"
        style={{
          position: keyboardShown ? 'absolute' : 'relative',
          bottom: 0,
          marginBottom: keyboardShown ? keyboardOffset : 0,
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
      <Box
        backgroundColor="disabled"
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
    </>
  )
}
