import React, { FC } from 'react'
import Modal, { ModalProps } from 'react-native-modal'
import { Box } from '../utils/theme/index'

type StyleProps = {
  backgroundColor: string
  marginHorizontal: number
}

type CustomModalProps = {
  isVisible: boolean
  style: StyleProps
}

export const CustomModal: FC<CustomModalProps & Partial<ModalProps>> = ({
  isVisible,
  style,
  children,
  ...props
}) => {
  console.log(isVisible)
  return (
    <Box>
      <Modal isVisible={isVisible} {...props}>
        <Box style={style}>{children}</Box>
      </Modal>
    </Box>
  )
}
