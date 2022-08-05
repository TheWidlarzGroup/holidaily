import React from 'react'
import { Box } from 'utils/theme'
import { DrawerIcon } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerComponents/DrawerItem'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useBooleanState } from 'hooks/useBooleanState'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { Analytics } from 'services/analytics'
import axios from 'axios'
import { queryClient } from 'dataAccess/queryClient'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { removeMany } from 'utils/localStorage'
import { useCreateTempUser } from 'dataAccess/mutations/useCreateTempUser'

export const Logout = () => {
  const { t } = useTranslation(['confirmLogoutModal', 'navigation'])
  const { updateUser } = useUserContext()
  const { reset: clearUserCache } = useCreateTempUser()

  const [isConfirmationNeeded, { setTrue: askUserForConfirmation, setFalse: hideModal }] =
    useBooleanState(false)

  const handleLogout = async () => {
    updateUser(null)
    delete axios.defaults.headers.common.userId
    clearUserCache()
    queryClient.invalidateQueries(QueryKeys.NOTIFICATIONS)
    queryClient.invalidateQueries(QueryKeys.USER_REQUESTS)
    queryClient.invalidateQueries(QueryKeys.USER_STATS)
    queryClient.invalidateQueries(QueryKeys.ORGANIZATION)
    queryClient.invalidateQueries(QueryKeys.POSTS)
    await removeMany([
      'userId',
      'firstName',
      'lastName',
      'occupation',
      'photo',
      'userColor',
      'seenNotificationsIds',
      'seenTeamsModal',
      'draftPost',
    ])
  }

  const onLogout = async () => {
    hideModal()
    Analytics().track('LOG_OUT')
    await handleLogout()
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
