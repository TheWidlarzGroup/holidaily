import React from 'react'
import { ModalProps } from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import { ImageSourcePropType } from 'react-native'
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { CustomModal } from 'components/CustomModal'
import { theme, BaseOpacity, mkUseStyles, Theme, Text, Box } from 'utils/theme'

import Smartphone from 'assets/icons/icon-smartphone.svg'
import Gallery from 'assets/icons/icon-gallery.svg'

type UploadPictureModalProps = Pick<ModalProps, 'isVisible'> & {
  hideModal: () => void
  onUserCancelled: () => void
  setPhotoURI: React.Dispatch<React.SetStateAction<ImageSourcePropType | undefined>>
}
export const UploadPictureModal = ({
  isVisible,
  hideModal,
  onUserCancelled,
  setPhotoURI,
}: UploadPictureModalProps) => {
  const styles = useStyles()
  const { t } = useTranslation('uploadPictureModal')

  const onOpenCamera = () => {
    console.log('open camera')
  }
  const onOpenGallery = () => {
    console.log('open gallery')
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    }
    launchImageLibrary(options, (response) => {
      console.log({ response })
      if (response.didCancel) {
        onUserCancelled()
      }
      setPhotoURI(response?.assets?.uri)
    })
  }

  return (
    <CustomModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      backdropColor={theme.colors.white}
      backdropOpacity={0.8}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      swipeDirection="down"
      style={styles.modal}
      hideModalContentWhileAnimating>
      <Box padding="lplus">
        <BaseOpacity onPress={onOpenCamera} flexDirection="row" justifyContent="flex-start">
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
          onPress={onOpenGallery}
          flexDirection="row"
          marginTop="m"
          justifyContent="center">
          <Gallery />
          <Box flexGrow={1} marginLeft="m">
            <Text variant="boldBlack18">{t('openGallery')}</Text>
          </Box>
        </BaseOpacity>
      </Box>
    </CustomModal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    height: 175,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
  borderBottom: {
    borderBottomColor: theme.colors.black,
    borderBottomWidth: 1,
    paddingBottom: 17,
  },
}))
