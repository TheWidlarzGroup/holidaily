import { useAddPost } from 'dataAccess/mutations/useAddPost'
import { useSetStatusBarStyle } from 'hooks/useSetStatusBarStyle'
import { useUserContext } from 'hooks/useUserContext'
import { useUserSettingsContext } from 'hooks/useUserSettingsContext'
import { FeedPost, FeedPostDataType } from 'mockApi/models/miragePostTypes'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { ModalNavigationProps } from 'navigation/types'
import React, { useState } from 'react'
import { Asset } from 'react-native-image-picker'
import { generateUUID } from 'utils/generateUUID'
import { CreatePostForm } from './CreatePostForm/CreatePostForm'
import { PostState } from './CreatePostForm/usePostFormReducer'
import { CreatePostResult } from './CreatePostResult/CreatePostResult'
import { CreatePostStatus } from './types'

type PostAttachment = {
  src: string
  type: FeedPostDataType
}

export const CreatePost = ({ route }: ModalNavigationProps<'CREATE_POST'>) => {
  const { userSettings } = useUserSettingsContext()
  useSetStatusBarStyle(userSettings)
  const [status, setStatus] = useState<CreatePostStatus>('draft')
  const photo = route.params?.photo
  const { user } = useUserContext()
  const { mutate } = useAddPost()

  const addAttachments = (attachments: Asset[]): PostAttachment[] =>
    attachments.map((item) => {
      if (item.type === 'image/jpeg') {
        return {
          src: item.uri || '',
          type: 'image',
        }
      }
      return {
        src: item.uri || '',
        type: 'video',
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
      data: data.images.length > 0 ? addAttachments(data.images) : [],
    }
    mutate(feedPost)

    if (!data) return setStatus('failure')
    setStatus('success')
  }

  return (
    <SwipeableScreen>
      {status === 'draft' ? (
        <CreatePostForm photosAsset={photo} onSend={handleOnSend} />
      ) : (
        <CreatePostResult status={status} />
      )}
    </SwipeableScreen>
  )
}
