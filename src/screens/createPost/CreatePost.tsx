import { ModalNavigationProps } from 'navigation/types'
import React, { useState } from 'react'
import { CreatePostForm } from './CreatePostForm/CreatePostForm'
import { CreatePostResult } from './CreatePostResult/CreatePostResult'
import { CreatePostStatus } from './types'

export const CreatePost = ({ route }: ModalNavigationProps<'CreatePost'>) => {
  const [status, setStatus] = useState<CreatePostStatus>('draft')
  const photo = route.params?.photo

  return (
    <>
      {status === 'draft' ? (
        <CreatePostForm
          photosAsset={photo}
          onSend={(data) => {
            if (!data) return setStatus('failure')
            setStatus('success')
          }}
        />
      ) : (
        <CreatePostResult status={status} />
      )}
    </>
  )
}
