import React from 'react'
import { Box } from 'utils/theme'
import { DrawerIcon } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerComponents/DrawerItem'
import { useTranslation } from 'react-i18next'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { useUserContext } from 'hooks/useUserContext'
import { useTeamsContext } from 'hooks/useTeamsContext'

export const Logout = () => {
  const { t } = useTranslation(['confirmLogoutModal', 'navigation'])
  const { handleLogout } = useUserContext()
  const { reset: resetTeams } = useTeamsContext()
  const onPress = useWithConfirmation({
    onAccept: () => {
      handleLogout()
      resetTeams()
    },
    header: t('confirmLogoutModal:areYouSure'),
    acceptBtnText: t('confirmLogoutModal:yes'),
    declineBtnText: t('confirmLogoutModal:no'),
  })
  return (
    <Box marginBottom="xxl" alignItems="flex-start">
      <DrawerItem text={t('navigation:logout')} icon={DrawerIcon('Logout')} onPress={onPress} />
    </Box>
  )
}
