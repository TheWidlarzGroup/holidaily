import React, { useEffect } from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'
import { Asset } from 'react-native-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { useBooleanState } from 'hooks/useBooleanState'
import { Submit } from 'components/Submit'
import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useTranslation } from 'react-i18next'
import { Box, useTheme } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { removeItem } from 'utils/localStorage'
import { PostHeader } from './PostFormHeader'
import { PostBody } from './PostFormBody'
import { PostAction, PostState } from './usePostFormReducer'
import { ModalLocationPicker } from './ModalLocationPicker'
import { PostFormFooter } from './PostFormFooter/PostFormFooter'

type CreatePostFormProps = {
  onSend: F1<PostState>
  state: PostState
  dispatch: F1<PostAction>
  photosAsset?: Asset
}

export const CreatePostForm = ({ onSend, photosAsset, state, dispatch }: CreatePostFormProps) => {
  const [isLocationPickerOpen, { setTrue: openLocationPicker, setFalse: hideLocationPicker }] =
    useBooleanState(false)
  const [isDeclineModalOpen, { setTrue: openDeclineModal, setFalse: hideDeclineModal }] =
    useBooleanState(false)
  const theme = useTheme()
  const { t } = useTranslation('feed')
  const { goBack } = useNavigation()

  const galleryImages = state.images.map(assetToGalleryItem)
  const sendDisabled = isSendDisabled(state)

  const removeAttachment = (id: string) => {
    dispatch({ type: 'removeImage', payload: { id } })
  }

  const closeCreatePostForm = () => {
    const { images, location, text } = state
    if (images.length > 0 || text.length > 0 || !!location) {
      return openDeclineModal()
    }
    goBack()
  }

  useEffect(() => {
    if (photosAsset) {
      dispatch({ type: 'addImages', payload: { images: [photosAsset] } })
    }
  }, [dispatch, photosAsset])

  return (
    <SafeAreaWrapper edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.white }}
        behavior="height">
        <PostHeader closeCreatePostForm={closeCreatePostForm} />
        <ScrollView>
          <PostBody
            text={state.text}
            location={state.location}
            onTextChange={(text) => dispatch({ type: 'updateText', payload: { text } })}
            data={galleryImages}
            removeAttachment={removeAttachment}
          />
        </ScrollView>
        <PostFormFooter
          onLocationPress={openLocationPicker}
          onImagesPick={(images) => dispatch({ type: 'addImages', payload: { images } })}
          imagesCount={state.images.length}
        />
      </KeyboardAvoidingView>
      <Box bg="white" paddingBottom="s">
        <Submit disabledCTA={sendDisabled} noBg onCTAPress={() => onSend(state)} />
      </Box>
      <ModalLocationPicker
        visible={isLocationPickerOpen}
        onLocationChange={(locationPayload) => {
          dispatch({ type: 'setLocation', payload: locationPayload })
          hideLocationPicker()
        }}
        onRequestClose={hideLocationPicker}
      />
      <ConfirmationModal
        isVisible={isDeclineModalOpen}
        header={t('discardHeader')}
        content={t('discardDesc')}
        acceptBtnText={t('discard')}
        declineBtnText={t('keepEditing')}
        onAccept={() => {
          hideDeclineModal()
          goBack()
        }}
        hideModal={hideDeclineModal}
        onDecline={() => {
          hideDeclineModal()
          removeItem('draftPost')
        }}
      />
    </SafeAreaWrapper>
  )
}

const assetToGalleryItem = (asset: Asset): AttachmentType => ({
  id: asset.id ?? '',
  type: asset.type ? 'image' : 'video',
  uri: asset.uri ?? '',
})

const isSendDisabled = ({ text, images }: PostState) => text.length === 0 && images.length === 0
