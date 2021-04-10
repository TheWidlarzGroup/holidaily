import React, { FC } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import { Box } from '../utils/theme/index'

type CustomModalProps = {
  isVisible: boolean
  style: StyleProp<ViewStyle>
}

export const CustomModal: FC<CustomModalProps & Partial<ModalProps>> = ({
  isVisible,
  style,
  children,
  ...props
}) => (
  <Box>
    <Modal isVisible={isVisible} {...props}>
      <Box style={style}>{children}</Box>
    </Modal>
  </Box>
)
