import React from 'react'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import IconGallery from 'assets/icons/icon-gallery.svg'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useBooleanState } from 'hooks/useBooleanState'
import { UploadAttachmentModal } from 'components/UploadAttachmentModal'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { makeUserDetails } from 'utils/userDetails'
import { Analytics } from 'services/analytics'
import { BottomTabNavigationType } from 'navigation/types'
import { AttachmentDataType } from 'mockApi/models/miragePostTypes'

const ICON_SIZE = 30

export const FeedHeader = () => {
  const { navigate } = useNavigation<BottomTabNavigationType<'FEED'>>()
  const { t } = useTranslation('feed')
  const theme = useTheme()
  const [
    showAttachmentModal,
    { setFalse: setShowAttachmentModalFalse, setTrue: setShowAttachmentModalTrue },
  ] = useBooleanState(false)
  const { user } = useUserContext()

  const changeDataRequest = (modalPhoto: AttachmentDataType) => {
    navigate('CREATE_POST_NAVIGATION', {
      screen: 'CREATE_POST',
      params: { modalAsset: modalPhoto },
    })
  }

  const handleGalleryIcon = () => {
    setShowAttachmentModalTrue()
    Analytics().track('FEED_ADD_ATTACHMENT_MODAL_OPENED')
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
        <BaseOpacity
          flexGrow={1}
          onPress={() => navigate('CREATE_POST_NAVIGATION')}
          justifyContent="center">
          <Text variant="textSM" color="headerGrey">
            {t('createPostLabel')}
          </Text>
        </BaseOpacity>
        <BaseOpacity onPress={handleGalleryIcon} justifyContent="center" paddingRight="s">
          <IconGallery height={ICON_SIZE} color={theme.colors.headerGrey} />
        </BaseOpacity>
        <UploadAttachmentModal
          source="FEED"
          isVisible={showAttachmentModal}
          hideModal={setShowAttachmentModalFalse}
          onUserCancelled={setShowAttachmentModalFalse}
          showCamera
          setPhotoURI={(uri, type) => {
            if (!uri) return
            changeDataRequest({ uri, id: new Date().toString(), type })
          }}
        />
      </Box>
    </>
  )
}
