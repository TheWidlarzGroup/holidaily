import { useNavigation } from '@react-navigation/native'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { CustomButton } from 'components/CustomButton'
import { useModalContext } from 'contexts/ModalProvider'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUserDetailsContext } from 'screens/editProfile/helpers/UserDetailsContext'
import { Box } from 'utils/theme'

type SaveSubscriptionsProps = {
  disabled?: boolean
  selectedTeams: any[]
}

export const SaveSubscriptions = (p: SaveSubscriptionsProps) => {
  const { t } = useTranslation('userProfile')
  const { showModal, hideModal } = useModalContext()
  const { goBack } = useNavigation()
  const { userTeams, setUserTeams } = useUserDetailsContext()
  const submitSubscriptions = () => {
    setUserTeams([...p.selectedTeams, ...userTeams])
    showModal(
      <ChangesSavedModal
        isVisible
        content={p.selectedTeams.length > 1 ? t('newTeamsConfirmation') : t('newTeamConfirmation')}
        hideModal={hideModal}
      />
    )
    goBack()
  }
  return (
    <Box position="absolute" bottom={16} alignSelf="center">
      <CustomButton
        label={t('subscribe')}
        variant="primary"
        onPress={submitSubscriptions}
        width={221}
        height={53}
        disabled={p.disabled}
      />
    </Box>
  )
}
