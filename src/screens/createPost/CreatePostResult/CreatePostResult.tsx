import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SwipeableModal } from 'components/SwipeableModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { SuccessCard } from './SuccessCard'
import { CreatePostStatus } from '../types'

type CreatePostResultProps = {
  status: CreatePostStatus
}

export const CreatePostResult = (props: CreatePostResultProps) => {
  const { goBack, setOptions } = useNavigation()
  const [isVisible, { setFalse: hideModal }] = useBooleanState(true)
  useLayoutEffect(() => {
    setOptions({
      cardStyle: { backgroundColor: 'transparent' },
    })
  }, [setOptions])
  useEffect(() => {
    if (!isVisible) goBack()
  }, [isVisible, goBack])
  useEffect(() => {
    const timeout = setTimeout(hideModal, 600)
    return () => clearTimeout(timeout)
  }, [hideModal])
  return (
    <SwipeableModal backdropOpacity={0} isOpen={isVisible} onHide={hideModal}>
      {props.status === 'success' && <SuccessCard />}
      {props.status === 'failure' && <SuccessCard />}
    </SwipeableModal>
  )
}
