import { useAddPost } from 'dataAccess/mutations/useAddPost'
import { useUserContext } from 'hooks/useUserContext'
import { FeedPost, FeedPostDataType } from 'mockApi/models/miragePostTypes'
import { ModalNavigationProps } from 'navigation/types'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { Asset } from 'react-native-image-picker'
import { CreatePostForm } from './CreatePostForm/CreatePostForm'
import { PostState } from './CreatePostForm/usePostFormReducer'
import { CreatePostResult } from './CreatePostResult/CreatePostResult'
import { CreatePostStatus } from './types'

type Attachment = {
  src: string
  type: FeedPostDataType
}

export const CreatePost = ({ route }: ModalNavigationProps<'CreatePost'>) => {
  const [status, setStatus] = useState<CreatePostStatus>('draft')
  const photo = route.params?.photo
  const { user } = useUserContext()
  const { mutate } = useAddPost()

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const addAttachments = (attachments: Asset[]) =>
    attachments.map((item) => {
      if (item.type === 'image/jpeg') {
        return {
          src: item.uri,
          type: 'image',
        } as Attachment
      }
      return {
        src: item.uri,
        type: 'video',
      } as Attachment
    })

  const handleOnSend = (data: PostState) => {
    const feedPost: FeedPost = {
      meta: {
        id: '1',
        author: {
          id: user?.id || '',
          name: `${user?.firstName} ${user?.lastName}` || '',
          occupation: user?.occupation || '',
          pictureUrl: user?.photo || '',
        },
        timestamp: { createdAt: new Date() },
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
    <>
      {status === 'draft' ? (
        <CreatePostForm photosAsset={photo} onSend={handleOnSend} />
      ) : (
        <CreatePostResult status={status} />
      )}
    </>
  )
}
