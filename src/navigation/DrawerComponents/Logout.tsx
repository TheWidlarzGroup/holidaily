import React from 'react'
import { Box, Text } from 'utils/theme'
import { DrawerIcon } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerComponents/DrawerItem'
import { useTranslation } from 'react-i18next'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { useUserContext } from 'hooks/useUserContext'
import { version } from '../../../package.json'

export const Logout = () => {
  const { t } = useTranslation(['confirmLogoutModal', 'navigation'])
  const { handleLogout } = useUserContext()
  const onPress = useWithConfirmation({
    onAccept: handleLogout,
    header: t('confirmLogoutModal:areYouSure'),
    acceptBtnText: t('confirmLogoutModal:yes'),
    declineBtnText: t('confirmLogoutModal:no'),
  })
  return (
    <Box marginBottom="xxl" alignItems="flex-start">
      <Text marginLeft="l" fontSize={10} color="greyDark">
        App Version: {version}
      </Text>
      <DrawerItem text={t('navigation:logout')} icon={DrawerIcon('Logout')} onPress={onPress} />
    </Box>
  )
}
