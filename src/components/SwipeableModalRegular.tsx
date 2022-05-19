import React, { PropsWithChildren } from 'react'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { ModalProps } from 'react-native-modal'
import { Box } from 'utils/theme'
import { CustomButton } from './CustomButton'
import { SwipeableModal } from './SwipeableModal'
import { SwipeableModalHeader } from './SwipeableModalHeader'

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
  const btnStyle = { marginTop: 'auto' }
  const btnLabel = props.buttonLabel ? props.buttonLabel : ''
  return (
    <SwipeableModal propagateSwipe {...props}>
      <Box flex={1} borderTopLeftRadius="l1min" borderTopRightRadius="l1min" overflow="hidden">
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
                    closeModal={props.onHide}
                    hasIndicator={props.hasIndicator}
                    closeAction={props.closeAction || 'close'}
                    aboutAction={props.aboutAction || props.onHide}
                  />
                  {props.children}
                  {props.buttonLabel && (
                    <Box paddingBottom="lplus" style={btnStyle}>
                      <TouchableOpacity onPress={props.buttonAction || props.onHide}>
                        <CustomButton label={btnLabel} variant="primary" />
                      </TouchableOpacity>
                    </Box>
                  )}
                </>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </ScrollView>
        </Box>
      </Box>
    </SwipeableModal>
  )
}
