import React, { PropsWithChildren } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native'
import { ModalProps } from 'react-native-modal'
import { BaseOpacity, Box } from 'utils/theme'
import { CustomButton } from './CustomButton'
import { SwipeableModal } from './SwipeableModal'
import { SwipeableModalHeader } from './SwipeableModalHeader'

export type SwipeableModalRegularProps = PropsWithChildren<
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
    useScrollView?: boolean
  } & Partial<
    Omit<ModalProps, 'onSwipeComplete' | 'onBackButtonPress' | 'onBackdropPress' | 'isVisible'>
  >
>

const btnStyle = { marginTop: 'auto' }
export const SwipeableModalRegular = (props: SwipeableModalRegularProps) => {
  const Header = () => (
    <SwipeableModalHeader
      title={props.title}
      subtitle={props.subtitle}
      aboutIcon={props.aboutIcon}
      closeModal={props.onHide}
      hasIndicator={props.hasIndicator}
      closeAction={props.closeAction || 'close'}
      aboutAction={props.aboutAction || props.onHide}
    />
  )
  const modalBtnProps: Readonly<RegularModalButtonProps> = {
    onHide: props.onHide,
    buttonAction: props.buttonAction,
    buttonLabel: props.buttonLabel,
  }

  return (
    <SwipeableModal propagateSwipe {...props}>
      <Box flex={1} borderTopLeftRadius="l1min" borderTopRightRadius="l1min" overflow="hidden">
        <Box flexGrow={1} backgroundColor="white" borderTopLeftRadius="m" borderTopRightRadius="m">
          <Header />
          {props.useScrollView ? (
            <ModalScrollView {...modalBtnProps}>{props.children}</ModalScrollView>
          ) : (
            <>
              {props.children}
              <RegularModalButton {...modalBtnProps} />
            </>
          )}
        </Box>
      </Box>
    </SwipeableModal>
  )
}

type RegularModalButtonProps = Pick<
  SwipeableModalRegularProps,
  'buttonLabel' | 'buttonAction' | 'onHide'
>

const RegularModalButton = (p: RegularModalButtonProps) => {
  const btnLabel = p.buttonLabel ?? ''
  return p.buttonLabel ? (
    <Box paddingBottom="lplus" style={btnStyle}>
      <CustomButton label={btnLabel} variant="primary" onPress={p.buttonAction || p.onHide} />
    </Box>
  ) : null
}
const ModalScrollView = ({
  children,
  ...modalBtnProps
}: PropsWithChildren<RegularModalButtonProps>) => (
  <ScrollView showsHorizontalScrollIndicator={false} bounces={false}>
    {/* Comment: TouchableOpacity and TouchableWithoutFeedback hack is needed for scrollview to work inside of react-native-modals */}
    <BaseOpacity activeOpacity={1}>
      <TouchableWithoutFeedback>
        <>
          {children}
          <RegularModalButton {...modalBtnProps} />
        </>
      </TouchableWithoutFeedback>
    </BaseOpacity>
  </ScrollView>
)
