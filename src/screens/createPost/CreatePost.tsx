import { useAddPost, useEditPost } from 'dataAccess/mutations/useAddPost'
import { useSetStatusBarStyle } from 'hooks/useSetStatusBarStyle'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import React from 'react'
import { Analytics } from 'services/analytics'
import { useNavigation } from '@react-navigation/native'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { useTranslation } from 'react-i18next'
import { getItem, removeItem, setItem } from 'utils/localStorage'
import { useCreatePostContext } from 'hooks/context-hooks/useCreatePostContext'
import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'
import { BottomTabNavigationType, CreatePostNavigationProps } from 'navigation/types'
import { FeedPost } from 'mockApi/models/miragePostTypes'
import { useBooleanState } from 'hooks/useBooleanState'
import { CreatePostForm } from './CreatePostForm/CreatePostForm'

export const CreatePost = ({ route }: CreatePostNavigationProps<'CREATE_POST'>) => {
  const [isDeclineModalOpen, { setTrue: openDeclineModal, setFalse: hideDeclineModal }] =
    useBooleanState(false)
  const { userSettings } = useUserSettingsContext()
  const { t } = useTranslation('createPost')
  const { postData, updatePostData } = useCreatePostContext()
  const { mutate: addPost } = useAddPost()
  const { mutate: editPost } = useEditPost()
  const { data: allPosts } = useGetPostsData()
  const { navigate, goBack } = useNavigation<BottomTabNavigationType<'CREATE_POST_NAVIGATION'>>()
  const { notify } = useGetNotificationsConfig()
  const modalAsset = route?.params?.modalAsset
  const editPostId = route?.params?.editPostId
  useSetStatusBarStyle(userSettings)

  const prevVersionOfPost = allPosts?.find((post) => post.id === postData?.id)
  const isPostEdited: boolean =
    !!editPostId &&
    (JSON.stringify(prevVersionOfPost?.data) !== JSON.stringify(postData?.data) ||
      JSON.stringify(prevVersionOfPost?.location) !== JSON.stringify(postData?.location) ||
      prevVersionOfPost?.text !== postData?.text)

  useAsyncEffect(async () => {
    if (modalAsset) return updatePostData({ data: [modalAsset] })
    if (editPostId) {
      const postToEdit = allPosts?.find((post) => post.id === editPostId)
      if (postToEdit) return updatePostData(postToEdit)
    }
    const draftPost = await getItem('draftPost')
    if (draftPost) {
      const parsedDraftPost: FeedPost = JSON.parse(draftPost)
      updatePostData({ ...parsedDraftPost, createdAt: new Date().getTime() })
    }
  }, [])

  const submitForm = () => {
    const showSuccessModal = () => {
      notify('successCustom', {
        params: {
          title: t('postSent'),
          onPressText: t('undo'),
          onPress: () =>
            navigate('CREATE_POST_NAVIGATION', {
              screen: 'CREATE_POST',
              params: { editPostId: postData?.id },
            }),
        },
      })
    }

    if (editPostId && postData) {
      if (!isPostEdited) return goBack()
      editPost(postData, { onSuccess: showSuccessModal })
    }
    if (postData && !prevVersionOfPost) addPost(postData, { onSuccess: showSuccessModal })

    const address = postData?.location
    const locationToSend = address ? `${address.city} ${address.country}` : postData?.location
    Analytics().track('CREATE_POST', {
      content: postData?.text || '',
      imagesCount: postData?.data?.length || 0,
      location: JSON.stringify(locationToSend),
    })
    goBack()
    removeItem('draftPost')
    updatePostData(null)
  }

  const onCreatePostDismiss = () => {
    if (!postData) return
    const { data, location, text } = postData
    if (!editPostId && (data.length > 0 || text.length > 0 || !!location)) {
      notify('infoCustom', { params: { title: t('savedAsDraft') } })
      setItem('draftPost', JSON.stringify(postData))
    }
  }

  return (
    <SwipeableScreen
      swipeWithIndicator
      onDismiss={onCreatePostDismiss}
      onSwipeStart={isPostEdited ? () => openDeclineModal() : undefined}>
      <CreatePostForm
        submitForm={submitForm}
        isDeclineModalOpen={isDeclineModalOpen}
        openDeclineModal={openDeclineModal}
        hideDeclineModal={hideDeclineModal}
        isPostEdited={isPostEdited}
      />
    </SwipeableScreen>
  )
}
