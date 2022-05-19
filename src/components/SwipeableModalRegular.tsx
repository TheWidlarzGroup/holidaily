import { useBooleanState } from 'hooks/useBooleanState'
import React, { PropsWithChildren } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import { Box } from 'utils/theme'
import { CustomButton } from './CustomButton'
import { SafeAreaWrapper } from './SafeAreaWrapper'
import { SwipeableModalHeader } from './SwipeableModalHeader'

const DEFAULT_MODAL_ANIM_TIME = 300

type SwipeableModalTempProps = PropsWithChildren<
  {
    isOpen: boolean
    onHide: F0
    title?: string
    aboutAction?: F0
    subtitle?: string
    buttonAction?: F0
    aboutIcon?: boolean
    buttonLabel?: string
    hasIndicator?: boolean
    closeAction?: 'close' | 'back'
  } & Partial<
    Omit<ModalProps, 'onSwipeComplete' | 'onBackButtonPress' | 'onBackdropPress' | 'isVisible'>
  >
>

export const SwipeableModalRegular = (props: SwipeableModalTempProps) => {
  // COMMENT: we keep internal state to schedule parent rerender after the modal hide animation is finished. Otherwise we would experience lag between swipe gesture and hide animation
  const [isVisible, { setFalse: fadeOut, setTrue: resetState }] = useBooleanState(true)

  const modalHideHandler = () => {
    props.onHide()
    resetState()
  }

  const btnStyle = { marginTop: 'auto' }
  const modalStyle = { margin: 0, marginTop: 110 }
  const btnLabel = props.buttonLabel ? props.buttonLabel : ''

  return (
    <Modal
      hasBackdrop
      coverScreen
      style={modalStyle}
      swipeThreshold={20}
      statusBarTranslucent
      backdropColor="black"
      backdropOpacity={0.6}
      swipeDirection="down"
      animationIn="slideInUp"
      onSwipeComplete={fadeOut}
      onBackdropPress={fadeOut}
      onBackButtonPress={fadeOut}
      animationOut="slideOutDown"
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      isVisible={props.isOpen && isVisible}
      onModalHide={modalHideHandler}
      animationInTiming={DEFAULT_MODAL_ANIM_TIME}
      animationOutTiming={DEFAULT_MODAL_ANIM_TIME}
      propagateSwipe
      {...props}>
      <Box flex={1} borderTopLeftRadius="m" borderTopRightRadius="l" overflow="hidden">
        <SafeAreaWrapper isDefaultBgColor>
          <Box
            flexGrow={1}
            paddingTop="xm"
            paddingHorizontal="m"
            backgroundColor="white"
            borderTopLeftRadius="m"
            borderTopRightRadius="m">
            <ScrollView showsHorizontalScrollIndicator={false}>
              <TouchableOpacity activeOpacity={1}>
                <TouchableWithoutFeedback>
                  <>
                    <SwipeableModalHeader
                      title={props.title}
                      subtitle={props.subtitle}
                      aboutIcon={props.aboutIcon}
                      closeModal={modalHideHandler}
                      hasIndicator={props.hasIndicator}
                      closeAction={props.closeAction || 'close'}
                      aboutAction={props.aboutAction || modalHideHandler}
                    />
                    {props.children}
                    {props.buttonLabel && (
                      <Box paddingBottom="lplus" style={btnStyle}>
                        <TouchableOpacity onPress={props.buttonAction || modalHideHandler}>
                          <CustomButton label={btnLabel} variant="primary" />
                        </TouchableOpacity>
                      </Box>
                    )}
                  </>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </ScrollView>
          </Box>
        </SafeAreaWrapper>
      </Box>
    </Modal>
  )
}
