import React from 'react'
import { Box } from 'utils/theme'
import { DrawerIcon } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerComponents/DrawerItem'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { useTeamsContext } from 'hooks/useTeamsContext'
import { useBooleanState } from 'hooks/useBooleanState'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Analytics } from 'services/analytics'

export const Logout = () => {
  const { t } = useTranslation(['confirmLogoutModal', 'navigation'])
  const { handleLogout } = useUserContext()
  const { reset: resetTeams } = useTeamsContext()
  const [isConfirmationNeeded, { setTrue: askUserForConfirmation, setFalse: hideModal }] =
    useBooleanState(false)
  const onLogout = () => {
    hideModal()
    Analytics().track('LOG_OUT')
    Analytics().reset()
    handleLogout()
    resetTeams()
  }

  return (
    <Box marginBottom="xxl" alignItems="flex-start">
      <DrawerItem
        text={t('navigation:logout')}
        icon={DrawerIcon('Logout')}
        onPress={askUserForConfirmation}
      />
      <ConfirmationModal
        isVisible={isConfirmationNeeded}
        onAccept={onLogout}
        onDecline={hideModal}
        hideModal={hideModal}
        header={t('confirmLogoutModal:areYouSure')}
        acceptBtnText={t('confirmLogoutModal:yes')}
        declineBtnText={t('confirmLogoutModal:no')}
      />
    </Box>
  )
}
