import React, { FC } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import { Box } from 'utils/theme/index'

type CustomModalProps = {
  style: StyleProp<ViewStyle>
  onRequestClose?: F1<boolean>
}

export const CustomModal: FC<CustomModalProps & Partial<ModalProps>> = ({
  style,
  children,
  ...props
}) => (
  <Box>
    <Modal {...props}>
      <Box style={style}>{children}</Box>
    </Modal>
  </Box>
)
