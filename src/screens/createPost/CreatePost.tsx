import { useAddPost } from 'dataAccess/mutations/useAddPost'
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
import { useTranslation } from 'react-i18next'
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
  useSetStatusBarStyle(userSettings)
  const photo = route.params?.photo
  const [state, dispatch] = usePostFormReducer()
  const { user } = useUserContext()
  const { mutate } = useAddPost()
  const { goBack } = useNavigation()
  const { notify } = useGetNotificationsConfig()

  const addAttachments = (attachments: Asset[]): PostAttachment[] =>
    attachments.map((item) => {
      if (item.type === 'image/jpeg') {
        return {
          uri: item.uri || '',
          type: 'image',
          id: generateUUID(),
        }
      }
      return {
        uri: item.uri || '',
        type: 'video',
        id: generateUUID(),
      }
    })

  const handleOnSend = (data: PostState) => {
    const feedPost: FeedPost = {
      meta: {
        id: generateUUID(),
        author: {
          id: user?.id || '',
          name: `${user?.firstName} ${user?.lastName}` || '',
          occupation: user?.occupation || '',
          pictureUrl: user?.photo || '',
          userColor: user?.userColor,
          lastName: user?.lastName,
        },
        timestamp: { createdAt: new Date() },
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
    mutate(feedPost)

    const address = data.location?.addresses[0]
    const locationToSend = address ? `${address.city} ${address.country}` : data.location
    Analytics().track('CREATE_POST', {
      content: data.text,
      imagesCount: data.images.length,
      location: JSON.stringify(locationToSend),
    })
    goBack()
    notify('successCustom', { params: { title: t('postSent') } })
  }

  const onCreatePostDismiss = () => {
    const { images, location, text } = state
    if (images.length > 0 || text.length > 0 || !!location) {
      notify('infoCustom', { params: { title: t('savedAsDraft') } })
    }
  }

  return (
    <SwipeableScreen onDismiss={onCreatePostDismiss}>
      <CreatePostForm photosAsset={photo} onSend={handleOnSend} state={state} dispatch={dispatch} />
    </SwipeableScreen>
  )
}
