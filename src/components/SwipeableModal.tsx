import { useBooleanState } from 'hooks/useBooleanState'
import React, { PropsWithChildren } from 'react'
import Modal, { ModalProps } from 'react-native-modal'

const DEFAULT_MODAL_ANIM_TIME = 300

type SwipeableModalProps = PropsWithChildren<
  {
    isOpen: boolean
    onHide: F0
  } & Partial<
    Omit<ModalProps, 'onSwipeComplete' | 'onBackButtonPress' | 'onBackdropPress' | 'isVisible'>
  >
>

export const SwipeableModal = ({ children, isOpen, onHide, ...rest }: SwipeableModalProps) => {
  // we keep internal state to schedule parent rerender after the modal hide animation is finished. Otherwise we would experience lag between swipe gesture and hide animation
  const [isVisible, { setFalse: fadeOut, setTrue: resetState }] = useBooleanState(true)
  return (
    <Modal
      statusBarTranslucent
      swipeThreshold={20}
      isVisible={isOpen && isVisible}
      hasBackdrop
      useNativeDriverForBackdrop
      coverScreen
      hideModalContentWhileAnimating
      backdropColor="black"
      backdropOpacity={0.6}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ margin: 0, marginTop: 110 }}
      animationInTiming={DEFAULT_MODAL_ANIM_TIME}
      animationOutTiming={DEFAULT_MODAL_ANIM_TIME}
      onModalHide={() => {
        onHide()
        resetState()
      }}
      onSwipeComplete={fadeOut}
      onBackButtonPress={fadeOut}
      onBackdropPress={fadeOut}
      {...rest}>
      {children}
    </Modal>
  )
}
