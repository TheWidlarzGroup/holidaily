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
import { useKeyboard } from 'hooks/useKeyboard'
import { useState } from 'react'
import { useMemo } from 'react'

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
  const [, keyboardEvent] = useKeyboard()
  const [submitBtnHeight, setSubmitBtnHeight] = useState(0)
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
        style={{
          marginBottom:
            keyboardOffset - submitBtnHeight > 0 ? keyboardOffset - submitBtnHeight / 2 : 0,
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
        onLayout={({ nativeEvent: e }) => {
          setSubmitBtnHeight(e.layout.height)
        }}
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
