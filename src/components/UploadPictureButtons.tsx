import React from 'react'

import { useTranslation } from 'react-i18next'

import { BaseOpacity, Text, Box } from 'utils/theme'

import Smartphone from 'assets/icons/icon-smartphone.svg'
import Gallery from 'assets/icons/icon-gallery.svg'

type Action = 'gallery' | 'camera'
type UploadPictureButtonsProps = {
  onUploadImage: F1<Action>
}

export const UploadPictureButtons = ({ onUploadImage }: UploadPictureButtonsProps) => {
  const { t } = useTranslation('uploadPictureModal')

  return (
    <Box padding="lplus">
      <BaseOpacity
        onPress={() => onUploadImage('camera')}
        flexDirection="row"
        justifyContent="flex-start">
        <Smartphone />
        <Box
          flexGrow={1}
          borderBottomColor="black"
          borderBottomWidth={1}
          paddingBottom="m"
          marginLeft="m">
          <Text variant="boldBlack18">{t('openCamera')}</Text>
        </Box>
      </BaseOpacity>
      <BaseOpacity
        onPress={() => onUploadImage('gallery')}
        flexDirection="row"
        marginTop="m"
        justifyContent="center">
        <Gallery />
        <Box flexGrow={1} marginLeft="m">
          <Text variant="boldBlack18">{t('openGallery')}</Text>
        </Box>
      </BaseOpacity>
    </Box>
  )
}
