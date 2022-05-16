import React from 'react'
import { ModalProps } from 'react-native-modal'
import EditIconSvg from 'assets/icons/icon-edit.svg'
import BinIcon from 'assets/icons/icon-bin.svg'
import { SvgProps } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import { Box } from 'utils/theme'
import { OptionsModal } from './OptionsModal'

type EditPictureModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  showUploadModal: F0
  showDeleteCheckModal: F0
}

const EditIcon = (p: SvgProps) => (
  <Box style={{ position: 'relative', left: -8, width: 32 }}>
    <EditIconSvg {...p} />
  </Box>
)

export const EditPictureModal = ({
  isVisible,
  hideModal,
  showUploadModal,
  showDeleteCheckModal,
}: EditPictureModalProps) => {
  const { t } = useTranslation('uploadAttachmentModal')
  const onDeleteImage = () => {
    showDeleteCheckModal()
  }
  const onChangeImage = () => {
    showUploadModal()
  }
  const pictureChangeOptions = [
    {
      Icon: EditIcon,
      text: t('changePicture'),
      onPress: onChangeImage,
    },
    {
      Icon: BinIcon,
      text: t('deletePicture'),
      onPress: onDeleteImage,
    },
  ]
  return <OptionsModal options={pictureChangeOptions} isOpen={isVisible} onHide={hideModal} />
}
