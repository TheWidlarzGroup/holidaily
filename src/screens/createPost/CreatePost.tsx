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
  const undoSendPost = route.params?.sentPost
  useSetStatusBarStyle(userSettings)

  useAsyncEffect(async () => {
    const draftPost = await getItem('draftPost')
    let post: PostState | undefined
    if (draftPost) post = JSON.parse(draftPost)
    if (undoSendPost)
      post = {
        text: undoSendPost.text,
        location: undoSendPost.meta.location || null,
        images: undoSendPost.data,
      }
    if (!post) return

    dispatch({ type: 'addImages', payload: { images: post.images } })
    dispatch({ type: 'updateText', payload: { text: post.text } })
    dispatch({ type: 'setLocation', payload: post.location })
  }, [undoSendPost])

  const handleOnSend = (data: PostState) => {
    const feedPost: FeedPost = {
      id: undoSendPost?.id || generateUUID(),
      meta: {
        author: {
          id: user?.id || '',
          name: `${user?.firstName} ${user?.lastName}` || '',
          occupation: user?.occupation || '',
          pictureUrl: user?.photo || '',
          userColor: user?.userColor,
          lastName: user?.lastName,
        },
        timestamp: { createdAt: new Date().getTime() },
        location: {
          position: data.location?.position || null,
          addresses: data.location?.addresses || [],
        },
      },
      text: data.text,
      reactions: [],
      comments: [],
      recentlyAdded: true,
      data: data.images.length > 0 ? addAttachments(data.images) : [],
    }

    if (undoSendPost) editPost(feedPost)
    else addPost(feedPost)

    const address = data.location?.addresses[0]
    const locationToSend = address ? `${address.city} ${address.country}` : data.location
    Analytics().track('CREATE_POST', {
      content: data.text,
      imagesCount: data.images.length,
      location: JSON.stringify(locationToSend),
    })
    goBack()
    notify('successCustom', {
      params: {
        title: t('postSent'),
        onPressText: t('undo'),
        onPress: () => navigate('CREATE_POST', { sentPost: feedPost }),
      },
    })
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
