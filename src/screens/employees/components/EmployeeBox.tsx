import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Box, Text, theme, mkUseStyles } from 'utils/theme'
import { capitalize } from 'utils/role'
import { useRemoveFromOrganization } from 'hooks/useRemoveFromOrganization'
import { useModalContext } from 'contexts/ModalProvider'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { Avatar } from 'components/Avatar'
import { RoleMenu } from './RoleMenu'
import { EmployeeBoxButtons } from './EmployeeBoxButtons'

type EmployeeBoxProps = {
  color?: string
  picture?: string
  joined: boolean
  firstName?: string
  lastName?: string
  email: string
  occupation?: string
  role: string
  id: string
}

export const EmployeeBox = ({
  color,
  picture,
  joined = false,
  firstName,
  lastName,
  email,
  occupation,
  role,
  id,
}: EmployeeBoxProps) => {
  const styles = useStyles()
  const { t } = useTranslation('adminPanel')
  const { showModal, hideModal } = useModalContext()
  const { handleRemoveFromOrganization, isSuccess: isSuccessRemoveFromOrganization } =
    useRemoveFromOrganization()
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState(role)

  const onCancelInvitation = () => {
    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={() => {
          // TODO API call to cancel user's invitation when endpoint ready
          hideModal()
          setTimeout(
            () =>
              showModal(
                <ChangesSavedModal
                  isVisible
                  hideModal={hideModal}
                  content={'Invitation cancelled!'}
                />
              ),
            0
          )
        }}
        onDecline={hideModal}
        content={`Do you want to cancel ${firstName} ${lastName} invitation?`}
      />
    )
  }

  const onOpenHistory = () => {}

  const onChangeRole = () => setIsRoleMenuOpen(!isRoleMenuOpen)

  const onRemoveEmployee = () => {
    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={() => {
          handleRemoveFromOrganization({ userId: id })
          hideModal()
          if (isSuccessRemoveFromOrganization)
            setTimeout(
              () =>
                showModal(
                  <ChangesSavedModal
                    isVisible
                    hideModal={hideModal}
                    content={`${firstName} ${lastName} deleted!`}
                  />
                ),
              0
            )
        }}
        onDecline={hideModal}
        header={`Do you want to delete ${firstName} ${lastName}?`}
        content={t('historyNotErased')}
      />
    )
  }

  const heightProgress = useDerivedValue(
    () => (isRoleMenuOpen ? withTiming(430, { duration: 200 }) : withTiming(90, { duration: 200 })),
    [isRoleMenuOpen]
  )
  const animatedOptions = useAnimatedStyle(() => ({
    height: heightProgress.value,
  }))

  return (
    <Animated.View style={[animatedOptions, styles.container]}>
      <Box height={90} justifyContent="flex-start" flexDirection="row">
        <Box
          height={90}
          width={16}
          style={{ backgroundColor: color || theme.colors.bottomBarIcons }}
        />
        <Box backgroundColor={'bottomBarIcons'} width={40} height={90} justifyContent="center">
          <Avatar src={picture} size="xs" />
        </Box>

        <Box margin="xm" justifyContent="flex-start">
          <Text variant="bold16">{firstName && lastName ? `${firstName} ${lastName}` : email}</Text>
          <Text variant="lightGreyRegular">{occupation}</Text>
          <Box
            backgroundColor="primary"
            alignSelf="flex-start"
            borderRadius="m"
            paddingHorizontal="s">
            <Text variant="regularWhite12" color="white">
              {capitalize(userRole)}
            </Text>
          </Box>
          <Text variant="lightGreyBold10">Joined 20/03/2021</Text>
        </Box>
        <EmployeeBoxButtons
          joined={joined}
          onOpenHistory={onOpenHistory}
          onChangeRole={onChangeRole}
          onRemoveEmployee={onRemoveEmployee}
          onCancelInvitation={onCancelInvitation}
        />
      </Box>
      {isRoleMenuOpen && (
        <RoleMenu role={userRole} onSelectRole={setUserRole} onCancel={onChangeRole} userId={id} />
      )}
    </Animated.View>
  )
}
const useStyles = mkUseStyles((theme) => ({
  container: {
    marginVertical: theme.spacing.xs,
    overflow: 'hidden',
    borderRadius: theme.borderRadii.lmin,
    backgroundColor: theme.colors.bottomTabBgColor,
  },
}))
