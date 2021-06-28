import React, { useState } from 'react'
import { CreatePostForm } from './CreatePostForm/CreatePostForm'
import { CreatePostResult } from './CreatePostResult/CreatePostResult'
import { CreatePostStatus } from './types'

export const CreatePost = () => {
  const [status, setStatus] = useState<CreatePostStatus>('draft')

  return (
    <>
      {status === 'draft' ? (
        <CreatePostForm
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
