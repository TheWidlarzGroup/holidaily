import React, { useEffect } from 'react'
import { ModalProps } from 'react-native-modal'
import {
  ImageLibraryOptions,
  launchImageLibrary,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker'
import {
  DocumentPickerOptions,
  pickSingle as pickDocument,
  types as documentTypes,
} from 'react-native-document-picker'
import Gallery from 'assets/icons/icon-gallery.svg'
import FileIcon from 'assets/icons/icon-file.svg'
import Smartphone from 'assets/icons/icon-smartphone.svg'
import { useTranslation } from 'react-i18next'
import { Analytics } from 'services/analytics'
import { FeedPostDataType } from 'mockApi/models/miragePostTypes'
import { AnalyticsScreens } from 'utils/eventMap'
import { OptionsModal } from './OptionsModal'

type UploadFilesProps =
  | {
      allowFiles: true
      setFile: F1<{ uri: string; name: string } | undefined>
    }
  | { allowFiles?: never }

type UploadAttachmentModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: F0
  source: AnalyticsScreens
  hideEditAttachmentModal?: F0
  onUserCancelled: F0
  setPhotoURI: F2<string | null, FeedPostDataType | undefined>
  showCamera?: true
} & UploadFilesProps
type PhotoSelectionChoice = 'gallery' | 'camera' | 'file'

export const UploadAttachmentModal = ({
  hideEditAttachmentModal,
  ...p
}: UploadAttachmentModalProps) => {
  const onHandleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      p.onUserCancelled()
      Analytics().track(`${p.source}_ADD_ATTACHMENT_MODAL_CANCELLED`)
    }
    if (response.assets) {
      const photo = response.assets[0]
      if (photo.uri) {
        Analytics().track(`${p.source}_ADD_ATTACHMENT_IMAGE_ADDED`, {
          uri: photo.uri,
          type: photo.type,
        })
        let assetType: FeedPostDataType | undefined
        if (photo.type === 'image' || photo.type === 'video') assetType = photo.type
        p.setPhotoURI(photo.uri, assetType)
      } else {
        Analytics().track(`${p.source}_ADD_ATTACHMENT_PHOTO_ADDED`, { type: photo.type })
      }
    }
  }

  const onUpload = (action: PhotoSelectionChoice) => {
    p.hideModal()
    if (p.allowFiles && action === 'file') {
      Analytics().track(`${p.source}_ADD_ATTACHMENT_MODAL_FILE_PICKED`)
      const { doc, docx, pdf, plainText, ppt, pptx } = documentTypes
      const options: DocumentPickerOptions<'android' | 'ios'> = {
        type: [doc, docx, pdf, plainText, ppt, pptx],
      }
      try {
        setTimeout(async () => {
          const { uri, name } = await pickDocument(options)
          p.setFile({ uri, name })
        }, 400)
      } catch (error) {
        p.setFile(undefined)
      }
    }
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    }
    if (action === 'gallery') {
      Analytics().track(`${p.source}_ADD_ATTACHMENT_MODAL_GALLERY_PICKED`)
      setTimeout(() => {
        launchImageLibrary(options, (response) => onHandleResponse(response))
      }, 400)
    }
    if (action === 'camera') {
      Analytics().track(`${p.source}_ADD_ATTACHMENT_MODAL_CAMERA_PICKED`)
      setTimeout(() => {
        launchCamera(options, (response) => onHandleResponse(response))
      }, 400)
    }
  }
  const { t } = useTranslation('uploadAttachmentModal')
  useEffect(() => {
    hideEditAttachmentModal?.()
  }, [hideEditAttachmentModal])
  const options = [
    {
      Icon: Gallery,
      text: t('openGallery'),
      onPress: () => onUpload('gallery'),
    },
  ]
  if (p.allowFiles)
    options.push({ Icon: FileIcon, text: t('chooseFile'), onPress: () => onUpload('file') })
  if (p.showCamera)
    options.push({ Icon: Smartphone, text: t('openCamera'), onPress: () => onUpload('camera') })
  return <OptionsModal isOpen={p.isVisible} options={options} onHide={p.hideModal} />
}
