import { DayOffRequest } from 'mock-api/models'
import React from 'react'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'
import Modal from 'react-native-modal'
import { ModalHeader } from '../ModalHeader'
import { RequestDetails } from './RequestDetails'

export const SeeRequestModal = (
  p: Omit<DayOffRequest, 'id' | 'user'> & { attachments?: { id: string; uri: string }[] }
) => {
  const styles = useStyles()
  return (
    <Modal
      isVisible
      hasBackdrop={false}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection="down"
      style={styles.modal}>
      <ModalHeader>
        <Text> Request</Text>
      </ModalHeader>
      <Box padding="m" flex={1}>
        <RequestDetails {...p} showStatus />
      </Box>
    </Modal>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.white,
  },
}))
