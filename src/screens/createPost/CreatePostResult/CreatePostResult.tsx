import React, { useCallback, useEffect, useLayoutEffect } from 'react'
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
  const fadeOut = useCallback(() => {
    hideModal()
    goBack()
  }, [goBack, hideModal])
  useEffect(() => {
    const timeout = setTimeout(fadeOut, 600)
    return () => clearTimeout(timeout)
  }, [fadeOut])
  return (
    <SwipeableModal backdropOpacity={0} isOpen={isVisible} onHide={fadeOut}>
      {props.status === 'success' && <SuccessCard />}
      {props.status === 'failure' && <SuccessCard />}
    </SwipeableModal>
  )
}
