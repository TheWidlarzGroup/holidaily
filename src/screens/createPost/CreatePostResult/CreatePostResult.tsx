import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { BaseOpacity } from 'utils/theme'
import { SuccessCard } from './SuccessCard'
import { CreatePostStatus } from '../types'

type CreatePostResultProps = {
  status: CreatePostStatus
}

export const CreatePostResult = (props: CreatePostResultProps) => {
  const { goBack, setOptions } = useNavigation()

  useLayoutEffect(() => {
    setOptions({
      cardStyle: { backgroundColor: 'transparent' },
    })
  }, [setOptions])

  return (
    <BaseOpacity onPress={() => goBack()} flexGrow={1} activeOpacity={1}>
      {props.status === 'success' && <SuccessCard />}
      {props.status === 'failure' && <SuccessCard />}
    </BaseOpacity>
  )
}
