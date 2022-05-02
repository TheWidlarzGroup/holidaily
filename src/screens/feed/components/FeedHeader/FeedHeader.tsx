import React from 'react'
import { Box, BaseOpacity, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import IconGallery from 'assets/icons/icon-gallery-2.svg'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
import { AttachmentType } from 'types/holidaysDataTypes'
import { useUserContext } from 'hooks/useUserContext'
import { makeUserDetails } from 'utils/userDetails'

export const FeedHeader = () => {
  const { navigate } = useNavigation()
  const { t } = useTranslation('feed')
  const [
    showAttachmentModal,
    { setFalse: setShowAttachmentModalFalse, setTrue: setShowAttachmentModalTrue },
  ] = useBooleanState(false)
  const { user } = useUserContext()
  const changeDataRequest = (modalPhoto: AttachmentType) => {
    navigate('CreatePost', { photo: modalPhoto })
  }

  return (
    <Box flexDirection="row" alignItems="stretch" padding="m" bg="white" borderRadius="l">
      <Box marginRight="m">
        <Avatar src={user?.photo} userDetails={makeUserDetails(user)} size="s" />
      </Box>
      <BaseOpacity flexGrow={1} onPress={() => navigate('CreatePost')} justifyContent="center">
        <Text variant="labelGreyLight">{t('createPostLabel')}</Text>
      </BaseOpacity>
      <BaseOpacity onPress={setShowAttachmentModalTrue} justifyContent="center">
        <IconGallery />
      </BaseOpacity>
      <UploadAttachmentModal
        isVisible={showAttachmentModal}
        hideModal={setShowAttachmentModalFalse}
        onUserCancelled={setShowAttachmentModalFalse}
        showCamera
        setPhotoURI={(uri) => {
          if (!uri) return
          changeDataRequest({ uri, id: new Date().toString() })
        }}
      />
    </Box>
  )
}
