import React from 'react'
import { ModalProps } from 'react-native-modal'
import { Box } from 'utils/theme'
import { BottomModal } from 'components/BottomModal'
import { RequestSentButtons } from './RequestSent/RequestSentButtons'
import { RequestSentInfo } from './RequestSent/RequestSentInfo'
import { RequestSentImage } from './RequestSent/RequestSentImage'

type RequestSentProps = Pick<ModalProps, 'isVisible'> & {
  onPressSee: F0
  onPressAnother: F0
  onPressOk: F0
}

export const RequestSent = ({ isVisible, ...buttonPressHandlers }: RequestSentProps) => (
  <BottomModal isVisible={isVisible} coverScreen>
    <Box
      alignItems="center"
      paddingHorizontal="xxl"
      flex={1}
      paddingBottom="xl"
      justifyContent="flex-end">
      <RequestSentImage />
      <RequestSentInfo />
      <RequestSentButtons {...buttonPressHandlers} />
    </Box>
  </BottomModal>
)
