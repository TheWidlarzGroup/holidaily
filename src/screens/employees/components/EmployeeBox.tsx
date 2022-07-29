import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Text, theme } from 'utils/theme'
import { capitalize } from 'utils/role'
import { useModalContext } from 'contexts/ModalProvider'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { Avatar } from 'components/Avatar'
import { EmployeeBoxButtons } from './EmployeeBoxButtons'
import { UserTypes } from './EmployeeTypes'

type EmployeeBoxProps = {
  color?: string
  picture?: string
  id: string
} & Pick<UserTypes, 'firstName' | 'lastName' | 'email' | 'role' | 'occupation' | 'confirmed'>

export const EmployeeBox = (p: EmployeeBoxProps) => {
  const styles = useStyles()
  const { t } = useTranslation('adminPanel')
  const { showModal, hideModal } = useModalContext()
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false)
  const userNameToDisplay = p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : p.email

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
                  content={t('invitationCancelled')}
                />
              ),
            0
          )
        }}
        onDecline={hideModal}
        content={t('invitationCancelRequest', {
          name: userNameToDisplay,
        })}
      />
    )
  }

  const onOpenHistory = () => {}

  const onChangeRole = () => setIsRoleMenuOpen(!isRoleMenuOpen)

  const handleAcceptRemoveEmployee = () => {
    // handleRemoveFromOrganization({ userId: p.id })
    hideModal()
    // if (isSuccessRemoveFromOrganization)
    setTimeout(
      () =>
        showModal(
          <ChangesSavedModal
            isVisible
            hideModal={hideModal}
            content={t('removedFromOrganization', {
              name: userNameToDisplay,
            })}
          />
        ),
      0
    )
  }

  const onRemoveEmployee = () => {
    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={handleAcceptRemoveEmployee}
        onDecline={hideModal}
        header={t('removeFromOrganization', {
          name: userNameToDisplay,
        })}
        content={t('historyNotErased')}
      />
    )
  }

  const heightProgress = useDerivedValue(
    () => (isRoleMenuOpen ? withTiming(430, { duration: 400 }) : withTiming(90, { duration: 400 })),
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
          style={{ backgroundColor: p.color || theme.colors.bottomBarIcons }}
        />
        <Box backgroundColor="bottomBarIcons" width={40} height={90} justifyContent="center">
          <Avatar src={p.picture} size="xs" />
        </Box>

        <Box margin="xm" justifyContent="flex-start" flex={1}>
          <Box>
            <Text numberOfLines={1} variant="textBoldMD">
              {userNameToDisplay}
            </Text>
          </Box>
          <Text variant="lightGreyRegular">{p.occupation}</Text>
          <Box
            backgroundColor="primary"
            alignSelf="flex-start"
            borderRadius="m"
            paddingHorizontal="s">
            <Text variant="regularWhite12" color="white">
              {capitalize(p.role)}
            </Text>
          </Box>
          <Text variant="lightGreyBold10">Joined 20/03/2021</Text>
        </Box>
        <EmployeeBoxButtons
          confirmed={p.confirmed}
          onOpenHistory={onOpenHistory}
          onChangeRole={onChangeRole}
          onRemoveEmployee={onRemoveEmployee}
          onCancelInvitation={onCancelInvitation}
        />
      </Box>
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
