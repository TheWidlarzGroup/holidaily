import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import { Box } from 'utils/theme/index'

type CustomModalProps = {
  style?: StyleProp<ViewStyle>
  onRequestClose?: F1<boolean>
}

export const CustomModal = ({
  style,
  children,
  ...props
}: CustomModalProps & Partial<ModalProps>) => (
  <Box>
    <Modal {...props}>
      <Box style={style}>{children}</Box>
    </Modal>
  </Box>
)
