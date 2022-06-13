import { useBooleanState } from 'hooks/useBooleanState'
import React, { PropsWithChildren } from 'react'
import Modal, { ModalProps } from 'react-native-modal'
import { windowHeight } from 'utils/deviceSizes'
import { mkUseStyles, theme } from 'utils/theme'

const DEFAULT_MODAL_ANIM_TIME = 300

type SwipeableModalProps = PropsWithChildren<
  {
    isOpen: boolean
    onHide: F0
    hideBackdrop?: true
    onSwipeClose?: F0
  } & Partial<
    Omit<ModalProps, 'onSwipeComplete' | 'onBackButtonPress' | 'onBackdropPress' | 'isVisible'>
  >
>

export const SWIPEABLE_MODAL_OFFSET_TOP = 110
export const SWIPEABLE_MODAL_HEIGHT = windowHeight - SWIPEABLE_MODAL_OFFSET_TOP

export const SwipeableModal = ({
  children,
  isOpen,
  onHide,
  hideBackdrop,
  onSwipeStart,
  ...rest
}: SwipeableModalProps) => {
  // we keep internal state to schedule parent rerender after the modal hide animation is finished. Otherwise we would experience lag between swipe gesture and hide animation
  const [isVisible, { setFalse: fadeOut, setTrue: resetState }] = useBooleanState(true)
  const styles = useStyles()

  return (
    <Modal
      statusBarTranslucent
      swipeThreshold={20}
      isVisible={isOpen && isVisible}
      hasBackdrop={!hideBackdrop}
      useNativeDriverForBackdrop
      coverScreen
      onSwipeStart={onSwipeStart}
      hideModalContentWhileAnimating
      backdropColor="black"
      backdropOpacity={0.6}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.container}
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

const useStyles = mkUseStyles(() => ({
  container: {
    margin: 0,
    marginTop: SWIPEABLE_MODAL_OFFSET_TOP,
    shadowColor: theme.colors.modalShadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
}))
