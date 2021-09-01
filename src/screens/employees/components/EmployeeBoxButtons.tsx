import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box } from 'utils/theme'
import KeyIcon from 'assets/icons/icon-key.svg'
import MailIcon from 'assets/icons/icon-mail.svg'
import HistoryIcon from 'assets/icons/icon-history.svg'
import AvatarIcon from 'assets/icons/icon-avatar-minus.svg'

type EmployeeBoxButtonsProps = {
  joined: boolean
  onOpenHistory?: F0
  onChangeRole: F0
  onRemoveEmployee?: F0
  onCancelInvitation?: F0
}

export const EmployeeBoxButtons = ({
  joined,
  onOpenHistory,
  onChangeRole,
  onRemoveEmployee,
  onCancelInvitation,
}: EmployeeBoxButtonsProps) => (
  <Box
    marginRight="l"
    alignItems="flex-start"
    justifyContent="flex-end"
    flexDirection="row"
    style={{ marginLeft: 'auto', marginTop: 35 }}>
    {joined ? (
      <>
        <TouchableOpacity onPress={onOpenHistory}>
          <HistoryIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={onChangeRole} style={{ marginHorizontal: 23 }}>
          <KeyIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemoveEmployee}>
          <AvatarIcon />
        </TouchableOpacity>
      </>
    ) : (
      <>
        <TouchableOpacity onPress={onChangeRole} style={{ marginHorizontal: 23 }}>
          <KeyIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancelInvitation}>
          <MailIcon />
        </TouchableOpacity>
      </>
    )}
  </Box>
)
