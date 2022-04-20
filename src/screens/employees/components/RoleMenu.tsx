// import React, { useState } from 'react'
// import { TouchableOpacity } from 'react-native'
// import { useTranslation } from 'react-i18next'
// import { Text, Box, mkUseStyles } from 'utils/theme'
// import { capitalize } from 'utils/role'
// import { useModalContext } from 'contexts/ModalProvider'
// import { useChangeRole } from 'hooks/legacy-api-hooks/useChangeRole'
// import { ConfirmationModal } from 'components/ConfirmationModal'
// import { RadioInput } from 'components/RadioInput'
// import { CustomButton } from 'components/CustomButton'
// import { ChangesSavedModal } from 'components/ChangesSavedModal'
// import { roles } from 'types/useCreateInvitationTypes'
// import { UserTypes } from 'types/useUserTypes'
// // TODO: get roles from BE ??

// type RoleMenuProps = {
//   onSelectRole: F1<string>
//   onCancel: F0
// } & Pick<UserTypes, 'id' | 'email' | 'lastName' | 'firstName' | 'role'>

// export const RoleMenu = (p: RoleMenuProps) => {
//   const styles = useStyles()
//   const { handleChangeRole, isSuccess } = useChangeRole()
//   const { t } = useTranslation('adminPanel')
//   const { showModal, hideModal } = useModalContext()
//   const [selectedRole, setSelectedRole] = useState(p.role)

//   const onAcceptSelectRole = () => {
//     handleChangeRole({ userId: p.id, role: selectedRole })
//     hideModal()
//     p.onSelectRole(capitalize(selectedRole))
//     if (isSuccess)
//       setTimeout(
//         () =>
//           showModal(
//             <ChangesSavedModal isVisible hideModal={hideModal} content={t('permissionChanged')} />
//           ),
//         0
//       )
//     p.onCancel()
//   }

//   const handleSelectRole = () => {
//     showModal(
//       <ConfirmationModal
//         isVisible
//         hideModal={hideModal}
//         onAccept={onAcceptSelectRole}
//         onDecline={hideModal}
//         content={t('permissionRequest', { name: p.firstName ? p.firstName : p.email })}
//       />
//     )
//   }

//   return (
//     <Box marginTop="ml">
//       <Text variant="body1Bold">{t('changePermission')}</Text>
//       {roles.map((role) => (
//         <TouchableOpacity key={role} style={styles.option} onPress={() => setSelectedRole(role)}>
//           <RadioInput
//             checked={selectedRole.toLowerCase() === role.toLowerCase()}
//             onPress={() => {}}
//           />
//           <Text variant="body1" marginVertical="m" textAlign="left" marginLeft="ml">
//             {capitalize(role)}
//           </Text>
//         </TouchableOpacity>
//       ))}
//       <Box marginBottom="xm" alignSelf="center">
//         <TouchableOpacity onPress={p.onCancel} activeOpacity={1}>
//           <CustomButton label={t('cancel')} variant="secondary" width={221} height={53} />
//         </TouchableOpacity>
//       </Box>
//       <Box alignSelf="center">
//         <TouchableOpacity onPress={handleSelectRole} activeOpacity={1}>
//           <CustomButton label={t('save')} variant="primary" width={221} height={53} />
//         </TouchableOpacity>
//       </Box>
//     </Box>
//   )
// }
// const useStyles = mkUseStyles((theme) => ({
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: theme.spacing.s,
//   },
// }))
