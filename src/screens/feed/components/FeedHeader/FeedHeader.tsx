import React from 'react'
import { Box, BaseOpacity, Text, useTheme } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import IconGallery from 'assets/icons/icon-gallery.svg'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
import { AttachmentType } from 'types/holidaysDataTypes'
import { useUserContext } from 'hooks/useUserContext'
import { makeUserDetails } from 'utils/userDetails'

const ICON_SIZE = 30

export const FeedHeader = () => {
  const { navigate } = useNavigation()
  const { t } = useTranslation('feed')
  const theme = useTheme()
  const [
    showAttachmentModal,
    { setFalse: setShowAttachmentModalFalse, setTrue: setShowAttachmentModalTrue },
  ] = useBooleanState(false)
  const { user } = useUserContext()
  const changeDataRequest = (modalPhoto: AttachmentType) => {
    navigate('CreatePost', { photo: modalPhoto })
  }

  return (
    <>
      <Text variant="displayBoldSM" textAlign="center" margin="m">
        Holifeed
      </Text>
      <Box
        flexDirection="row"
        alignItems="stretch"
        padding="xm"
        bg="white"
        borderRadius="lmin"
        justifyContent="center">
        <Box marginRight="m" marginLeft="xs">
          <Avatar src={user?.photo} userDetails={makeUserDetails(user)} size="s" />
        </Box>
        <BaseOpacity flexGrow={1} onPress={() => navigate('CreatePost')} justifyContent="center">
          <Text variant="textSM" color="headerGrey">
            {t('createPostLabel')}
          </Text>
        </BaseOpacity>
        <BaseOpacity onPress={setShowAttachmentModalTrue} justifyContent="center" paddingRight="s">
          <IconGallery height={ICON_SIZE} color={theme.colors.headerGrey} />
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
    </>
  )
}
