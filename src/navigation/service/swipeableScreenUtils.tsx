import React from 'react'
import { EventArg, useNavigation } from '@react-navigation/native'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { useModalContext } from 'contexts/ModalProvider'
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { SharedValue, useAnimatedGestureHandler } from 'react-native-reanimated'
import type { SwipeableScreenProps } from '../SwipeableScreen'

type GoBackEvent = EventArg<
  'beforeRemove',
  true,
  {
    action: Readonly<{
      type: string
      // eslint-disable-next-line @typescript-eslint/ban-types
      payload?: object | undefined
      source?: string | undefined
      target?: string | undefined
    }>
  }
>
type OnGobackProps = {
  onSuccess: F0
} & (
  | {
      confirmLeave: true
      confirmLeaveOptions: SwipeableScreenProps['confirmLeaveOptions']
    }
  | { confirmLeave?: false }
)

export const useOnGoback = (p: OnGobackProps) => {
  const { dispatch } = useNavigation()
  const { hideModal, showModal } = useModalContext()
  return (e: GoBackEvent) => {
    if (p.confirmLeave) {
      e.preventDefault()
      showModal(
        <ConfirmationModal
          isVisible
          hideModal={hideModal}
          onAccept={() => {
            hideModal()
            p.onSuccess()
            requestAnimationFrame(() => dispatch(e.data.action))
          }}
          onDecline={() => {
            hideModal()
          }}
          {...p.confirmLeaveOptions}
        />
      )
    } else p.onSuccess()
  }
}

export const useSwipeGestureHandler = (translateY: SharedValue<number>) =>
  useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetY: number
      offsetX: number
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetY = translateY.value
    },
    onActive: (event, ctx) => {
      if (ctx.offsetY + event.translationY < 0) return
      translateY.value = ctx.offsetY + event.translationY
    },
  })
