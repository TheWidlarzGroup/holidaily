import React from 'react'
import { Box } from 'utils/theme'
import { getDrawerIcon } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerComponents/DrawerItem'
import { useTranslation } from 'react-i18next'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { useUserContext } from 'hooks/useUserContext'
import { ModalProvider } from 'contexts/ModalProvider'

function ActualLogout() {
  const { t: navigationTFunc } = useTranslation('navigation')
  const { t: modalTFunc } = useTranslation('confirmLogoutModal')
  const { handleLogout } = useUserContext()
  const onPress = useWithConfirmation({
    onAccept: handleLogout,
    header: modalTFunc('areYouSure'),
    acceptBtnText: modalTFunc('yes'),
    declineBtnText: modalTFunc('no'),
  })
  return (
    <Box marginBottom="xxl" alignItems="flex-start">
      <DrawerItem
        text={navigationTFunc('logout')}
        icon={getDrawerIcon('Logout')}
        onPress={onPress}
      />
    </Box>
  )
}

const WrappedLogout = () => (
  <ModalProvider>
    <ActualLogout />
  </ModalProvider>
)

export { WrappedLogout as Logout }
