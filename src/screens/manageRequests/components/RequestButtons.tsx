import { CustomButton } from 'components/CustomButton'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box } from 'utils/theme'

type RequestButtonsProps = {
  onApprove: F0
  onReject: F0
}

export const RequestButtons = ({ onApprove, onReject }: RequestButtonsProps) => (
  <Box alignItems="center">
    <Box marginBottom="xm">
      <TouchableOpacity onPress={onReject} activeOpacity={1}>
        <CustomButton label={'Decline'} variant="secondary" width={221} height={53} />
      </TouchableOpacity>
    </Box>
    <Box>
      <TouchableOpacity onPress={onApprove} activeOpacity={1}>
        <CustomButton label={'Approve'} variant="primary" width={221} height={53} />
      </TouchableOpacity>
    </Box>
  </Box>
)
