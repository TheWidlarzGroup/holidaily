import { useBooleanState } from 'hooks/useBooleanState'
import React, { PropsWithChildren } from 'react'
import Modal from 'react-native-modal'

const USER_MODAL_ANIM_TIME = 300

type SwipableModalProps = PropsWithChildren<{
  isOpen: boolean
  onHide: F0
}>

export const SwipeableModal = ({ children, isOpen, onHide }: SwipableModalProps) => {
  const [isFading, { setTrue: fadeOut }] = useBooleanState(false)
  return (
    <Modal
      statusBarTranslucent
      swipeThreshold={20}
      isVisible={isOpen && !isFading}
      hasBackdrop
      hideModalContentWhileAnimating
      useNativeDriver
      backdropColor="black"
      backdropOpacity={0.6}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ margin: 0, marginTop: 120 }}
      animationInTiming={USER_MODAL_ANIM_TIME}
      animationOutTiming={USER_MODAL_ANIM_TIME}
      onModalHide={onHide}
      onSwipeComplete={fadeOut}
      onBackButtonPress={fadeOut}
      onBackdropPress={fadeOut}>
      {children}
    </Modal>
  )
}
