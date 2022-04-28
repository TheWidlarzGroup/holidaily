import React, { PropsWithChildren } from 'react'
import Modal, { ModalProps } from 'react-native-modal'

const DEFAULT_MODAL_ANIM_TIME = 300

type SwipableModalProps = PropsWithChildren<
  {
    isOpen: boolean
    onHide: F0
  } & Partial<
    Omit<ModalProps, 'onSwipeComplete' | 'onBackButtonPress' | 'onBackdropPress' | 'isVisible'>
  >
>

export const SwipeableModal = ({ children, isOpen, onHide, ...rest }: SwipableModalProps) => (
  <Modal
    statusBarTranslucent
    swipeThreshold={20}
    isVisible={isOpen}
    hasBackdrop
    hideModalContentWhileAnimating
    backdropColor="black"
    backdropOpacity={0.6}
    swipeDirection="down"
    animationIn="slideInUp"
    animationOut="slideOutDown"
    style={{ margin: 0, marginTop: 120 }}
    animationInTiming={DEFAULT_MODAL_ANIM_TIME}
    animationOutTiming={DEFAULT_MODAL_ANIM_TIME}
    onSwipeComplete={onHide}
    onBackButtonPress={onHide}
    onBackdropPress={onHide}
    {...rest}>
    {children}
  </Modal>
)
