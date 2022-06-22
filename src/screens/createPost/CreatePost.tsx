import { useAddPost, useEditPost } from 'dataAccess/mutations/useAddPost'
import { useSetStatusBarStyle } from 'hooks/useSetStatusBarStyle'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { FeedPost, FeedPostDataType } from 'mockApi/models/miragePostTypes'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { ModalNavigationProps } from 'navigation/types'
import React from 'react'
import { Asset } from 'react-native-image-picker'
import { Analytics } from 'services/analytics'
import { generateUUID } from 'utils/generateUUID'
import { useNavigation } from '@react-navigation/native'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { useTranslation } from 'react-i18next'
import { getItem, removeItem, setItem } from 'utils/localStorage'
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'
import { CreatePostForm } from './CreatePostForm/CreatePostForm'
import { PostState, usePostFormReducer } from './CreatePostForm/usePostFormReducer'

type PostAttachment = {
  uri: string
  type: FeedPostDataType
  id: string
}

export const CreatePost = ({ route }: ModalNavigationProps<'CREATE_POST'>) => {
  const { userSettings } = useUserSettingsContext()
  const { t } = useTranslation('createPost')
  const { user } = useUserContext()
  const { mutate: addPost } = useAddPost()
  const { mutate: editPost } = useEditPost()
  const { navigate, goBack } = useNavigation()
  const { notify } = useGetNotificationsConfig()
  const [state, dispatch] = usePostFormReducer()
  const photo = route.params?.photo
  const sentPostToEdit = route.params?.sentPost
  useSetStatusBarStyle(userSettings)

  useAsyncEffect(async () => {
    const draftPost = await getItem('draftPost')
    let post: PostState | undefined
    if (draftPost) post = JSON.parse(draftPost)
    if (sentPostToEdit)
      post = {
        text: sentPostToEdit.text,
        location: sentPostToEdit.location,
        images: sentPostToEdit.data,
      }
    if (!post) return

    dispatch({ type: 'addImages', payload: { images: post.images } })
    dispatch({ type: 'updateText', payload: { text: post.text } })
    if (post.location) dispatch({ type: 'setLocation', payload: post.location })
  }, [sentPostToEdit])

  const handleOnSend = (data: PostState) => {
    const feedPost: FeedPost = {
      id: sentPostToEdit?.id || generateUUID(),
      author: {
        id: user?.id || '',
        name: `${user?.firstName} ${user?.lastName}` || '',
        occupation: user?.occupation || '',
        pictureUrl: user?.photo || '',
        userColor: user?.userColor,
        lastName: user?.lastName,
      },
      createdAt: sentPostToEdit?.createdAt || new Date().getTime(),
      location: data.location,
      text: data.text,
      reactions: [],
      comments: [],
      recentlyAdded: true,
      data: data.images.length > 0 ? addAttachments(data.images) : [],
    }

    const showSuccessModal = () => {
      notify('successCustom', {
        params: {
          title: t('postSent'),
          onPressText: t('undo'),
          onPress: () => navigate('CREATE_POST', { sentPost: feedPost }),
        },
      })
    }

    if (sentPostToEdit) editPost(feedPost, { onSuccess: showSuccessModal })
    else addPost(feedPost, { onSuccess: showSuccessModal })

    const address = data.location
    const locationToSend = address ? `${address.city} ${address.country}` : data.location
    Analytics().track('CREATE_POST', {
      content: data.text,
      imagesCount: data.images.length,
      location: JSON.stringify(locationToSend),
    })
    goBack()

    removeItem('draftPost')
  }

  const addAttachments = (attachments: Asset[]): PostAttachment[] =>
    attachments.map((item) => ({
      uri: item.uri || '',
      type: item.type === 'image/jpeg' ? 'image' : 'video',
      id: generateUUID(),
    }))

  const onCreatePostDismiss = () => {
    const { images, location, text } = state
    if (images.length > 0 || text.length > 0 || !!location) {
      notify('infoCustom', { params: { title: t('savedAsDraft') } })
      setItem('draftPost', JSON.stringify(state))
    }
  }

  return (
    <SwipeableScreen onDismiss={onCreatePostDismiss}>
      <CreatePostForm photosAsset={photo} onSend={handleOnSend} state={state} dispatch={dispatch} />
    </SwipeableScreen>
  )
}
