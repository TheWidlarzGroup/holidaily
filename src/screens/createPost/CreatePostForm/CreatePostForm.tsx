import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Submit } from 'components/Submit'
import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useTranslation } from 'react-i18next'
import { Box, useTheme } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { removeItem } from 'utils/localStorage'
import { useCreatePostContext } from 'hooks/context-hooks/useCreatePostContext'
import { CreatePostNavigationType } from 'navigation/types'
import { Asset } from 'react-native-image-picker'
import { generateUUID } from 'utils/generateUUID'
import { FeedPost, FeedPostData } from 'mockApi/models/miragePostTypes'
import { PostHeader } from './PostFormHeader'
import { PostFormFooter } from './PostFormFooter/PostFormFooter'
import { PostFormBody } from './PostFormBody'

type CreatePostFormProps = {
  submitForm: F0
  openDeclineModal: F0
  hideDeclineModal: F0
  isDeclineModalOpen: boolean
}

export const CreatePostForm = ({
  submitForm,
  openDeclineModal,
  hideDeclineModal,
  isDeclineModalOpen,
}: CreatePostFormProps) => {
  const theme = useTheme()
  const { t } = useTranslation('feed')
  const navigation = useNavigation<CreatePostNavigationType<'LOCATION_FORM'>>()
  const { postData, updatePostData, removePostAsset } = useCreatePostContext()
  const sendDisabled = isSendDisabled(postData)

  const closeCreatePostForm = () => {
    if (!postData) return navigation.goBack()
    if (postData?.data.length > 0 || postData?.text.length > 0 || !!postData?.location)
      return openDeclineModal()
    navigation.goBack()
  }

  return (
    <SafeAreaWrapper edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.white }}
        behavior="height">
        <PostHeader closeCreatePostForm={closeCreatePostForm} />
        <ScrollView>
          <PostFormBody removeAttachment={removePostAsset} />
        </ScrollView>
        <PostFormFooter
          onLocationPress={() => navigation.navigate('LOCATION_FORM')}
          onImagesPick={(images) =>
            updatePostData({ data: [...(postData?.data || []), ...addAttachments(images)] })
          }
          imagesCount={postData?.data.length || 0}
        />
      </KeyboardAvoidingView>
      <Box bg="white" paddingBottom="s">
        <Submit disabledCTA={sendDisabled} noBg onCTAPress={submitForm} />
      </Box>
      <ConfirmationModal
        isVisible={isDeclineModalOpen}
        header={t('discardHeader')}
        content={t('discardDesc')}
        acceptBtnText={t('discard')}
        declineBtnText={t('keepEditing')}
        onAccept={() => {
          hideDeclineModal()
          navigation.goBack()
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

const isSendDisabled = (props: Partial<FeedPost> | null) => {
  if ((props?.text && props?.text?.length > 0) || (props?.data && props?.data.length > 0))
    return false
  return true
}

const addAttachments = (attachments: Asset[]): FeedPostData[] =>
  attachments.map((item) => ({
    uri: item.uri || '',
    type: item.type === 'image/jpeg' ? 'image' : 'video',
    id: generateUUID(),
  }))
