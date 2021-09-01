import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Text, Box, mkUseStyles } from 'utils/theme'
import { capitalize } from 'utils/role'
import { useModalContext } from 'contexts/ModalProvider'
import { useChangeRole } from 'hooks/useChangeRole'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { RadioInput } from 'components/RadioInput'
import { CustomButton } from 'components/CustomButton'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { roles } from 'types/useCreateInvitationTypes'
// TODO: get roles from BE ??

type RoleMenuProps = {
  role: string
  onSelectRole: F1<string>
  onCancel: F0
  userId: string
}

export const RoleMenu = ({ role, onSelectRole, onCancel, userId }: RoleMenuProps) => {
  const styles = useStyles()
  const { handleChangeRole, isSuccess } = useChangeRole()
  const { t } = useTranslation('adminPanel')
  const { showModal, hideModal } = useModalContext()
  const [selectedRole, setSelectedRole] = useState(role)

  const onAcceptSelectRole = () => {
    handleChangeRole({ userId, role: selectedRole })
    hideModal()
    onSelectRole(capitalize(selectedRole))
    if (isSuccess)
      setTimeout(
        () =>
          showModal(
            <ChangesSavedModal isVisible hideModal={hideModal} content={'Permission changed!'} />
          ),
        0
      )
    onCancel()
  }

  const handleSelectRole = () => {
    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={onAcceptSelectRole}
        onDecline={hideModal}
        content={'Do you want to change USERNAME permission?'}
      />
    )
  }

  return (
    <Box marginTop="ml">
      <Text variant="body1Bold">{t('changePermission')}</Text>
      {roles.map((role) => (
        <TouchableOpacity key={role} style={styles.option} onPress={() => setSelectedRole(role)}>
          <RadioInput
            checked={selectedRole.toLowerCase() === role.toLowerCase()}
            onPress={() => {}}
          />
          <Text variant="body1" marginVertical="m" textAlign="left" marginLeft="ml">
            {capitalize(role)}
          </Text>
        </TouchableOpacity>
      ))}
      <Box marginBottom="xm" alignSelf="center">
        <TouchableOpacity onPress={onCancel} activeOpacity={1}>
          <CustomButton label={'Cancel'} variant="secondary" width={221} height={53} />
        </TouchableOpacity>
      </Box>
      <Box alignSelf="center">
        <TouchableOpacity onPress={handleSelectRole} activeOpacity={1}>
          <CustomButton label={'Save'} variant="primary" width={221} height={53} />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
const useStyles = mkUseStyles((theme) => ({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.s,
  },
}))
