import React, { forwardRef, PropsWithChildren, useEffect, useImperativeHandle } from 'react'
import { useBooleanState } from 'hooks/useBooleanState'
import Modal from 'react-native-modal'

const USER_MODAL_ANIM_TIME = 300

export type SwipeableModalRef = {
  hide: F0
}

type SwipableModalProps = PropsWithChildren<{
  // unmount should be the hideModal function from ModalProvider
  unmount: F0
}>

export const SwipeableModal = forwardRef<SwipeableModalRef, SwipableModalProps>(
  ({ children, unmount }, ref) => {
    const [isVisible, { setFalse: fadeOut }] = useBooleanState(true)
    useImperativeHandle(ref, () => ({
      hide: fadeOut,
    }))
    useEffect(() => {
      let timeout: number
      if (!isVisible) timeout = setTimeout(unmount, USER_MODAL_ANIM_TIME + 20)
      return () => clearTimeout(timeout)
    }, [isVisible, unmount])
    return (
      <Modal
        statusBarTranslucent
        swipeThreshold={20}
        isVisible={isVisible}
        hasBackdrop
        backdropColor="black"
        backdropOpacity={0.6}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ margin: 0, marginTop: 120 }}
        animationInTiming={USER_MODAL_ANIM_TIME}
        animationOutTiming={USER_MODAL_ANIM_TIME}
        onSwipeComplete={fadeOut}
        onBackButtonPress={fadeOut}
        onBackdropPress={fadeOut}>
        {children}
      </Modal>
    )
  }
)

SwipeableModal.displayName = 'SwipeableModal'
