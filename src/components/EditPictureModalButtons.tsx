import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, Box, BaseOpacity, useTheme } from 'utils/theme'

import EditIcon from 'assets/icons/icon-edit.svg'
import BinIcon from 'assets/icons/icon-bin.svg'

type EditPictureModalButtonsProps = {
  onChangeImage: F0
  onDeleteImage: F0
}

export const EditPictureModalButtons = ({
  onChangeImage,
  onDeleteImage,
}: EditPictureModalButtonsProps) => {
  const { t } = useTranslation('uploadAttachmentModal')
  const theme = useTheme()
  return (
    <Box padding="lplus">
      <BaseOpacity
        onPress={onChangeImage}
        activeOpacity={0.2}
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start">
        <Box marginHorizontal={'-s'}>
          <EditIcon width={34} height={34} color={theme.colors.black} />
        </Box>
        <Box flexGrow={1} marginLeft="m">
          <Text variant="boldBlack18">{t('changePicture')}</Text>
        </Box>
      </BaseOpacity>
      <Box height={1} backgroundColor="black" marginLeft="lplus" marginTop="m" />
      <BaseOpacity
        onPress={onDeleteImage}
        flexDirection="row"
        marginTop="m"
        justifyContent="center"
        alignItems="center"
        activeOpacity={0.2}>
        <BinIcon />
        <Box flexGrow={1} marginLeft="m">
          <Text variant="boldBlack18">{t('deletePicture')}</Text>
        </Box>
      </BaseOpacity>
    </Box>
  )
}
