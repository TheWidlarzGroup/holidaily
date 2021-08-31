import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Box, Text, theme, mkUseStyles } from 'utils/theme'
import { useModalContext } from 'contexts/ModalProvider'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Avatar } from 'components/Avatar'
import { RoleMenu } from './RoleMenu'
import { EmployeeBoxButtons } from './EmployeeBoxButtons'

type EmployeeBoxProps = {
  color?: string
  picture?: string
  joined?: boolean
}

export const EmployeeBox = ({ color, picture, joined = true }: EmployeeBoxProps) => {
  const styles = useStyles()
  const { t } = useTranslation('adminPanel')
  const { showModal, hideModal } = useModalContext()

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false)
  const [role, setRole] = useState('Manager')

  const onOpenHistory = () => {}
  const onChangeRole = () => setIsRoleMenuOpen(!isRoleMenuOpen)
  const onRemoveEmployee = () => {
    showModal(
      <ConfirmationModal
        isVisible
        hideModal={hideModal}
        onAccept={() => {}}
        onDecline={hideModal}
        header={'Do you want to delete Peter Kansas?'}
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
          <Text variant="bold16">Peter Kansas</Text>
          <Text variant="lightGreyRegular">UX Designer</Text>
          <Box
            backgroundColor="primary"
            alignSelf="flex-start"
            borderRadius="m"
            paddingHorizontal="s">
            <Text variant="regularWhite12" color="white">
              {role}
            </Text>
          </Box>
          <Text variant="lightGreyBold10">Joined 20/03/2021</Text>
        </Box>
        <EmployeeBoxButtons
          joined={joined}
          onOpenHistory={onOpenHistory}
          onChangeRole={onChangeRole}
          onRemoveEmployee={onRemoveEmployee}
        />
      </Box>
      {isRoleMenuOpen && <RoleMenu role={role} onSelectRole={setRole} onCancel={onChangeRole} />}
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
