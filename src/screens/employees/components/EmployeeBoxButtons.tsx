import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Box } from 'utils/theme'
import KeyIcon from 'assets/icons/icon-key.svg'
import MailIcon from 'assets/icons/icon-mail.svg'
import HistoryIcon from 'assets/icons/icon-history.svg'
import AvatarIcon from 'assets/icons/icon-avatar-minus.svg'
import { UserTypes } from 'screens/employees/components/EmployeeTypes'

type EmployeeBoxButtonsProps = {
  onOpenHistory?: F0
  onChangeRole: F0
  onRemoveEmployee?: F0
  onCancelInvitation?: F0
} & Pick<UserTypes, 'confirmed'>

export const EmployeeBoxButtons = (p: EmployeeBoxButtonsProps) => (
  <Box
    marginRight="l"
    alignItems="flex-start"
    justifyContent="flex-end"
    flexDirection="row"
    style={{ marginLeft: 'auto', marginTop: 35 }}>
    {p.confirmed ? (
      <>
        <TouchableOpacity onPress={p.onOpenHistory}>
          <HistoryIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={p.onChangeRole} style={{ marginHorizontal: 23 }}>
          <KeyIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={p.onRemoveEmployee}>
          <AvatarIcon />
        </TouchableOpacity>
      </>
    ) : (
      <>
        <TouchableOpacity onPress={p.onChangeRole} style={{ marginHorizontal: 23 }}>
          <KeyIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={p.onCancelInvitation}>
          <MailIcon />
        </TouchableOpacity>
      </>
    )}
  </Box>
)
