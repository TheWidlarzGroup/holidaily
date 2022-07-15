import React from 'react'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { ActionModal } from 'components/ActionModal'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'

export const ValidationModal = () => {
  const { isFormEmpty, setIsFormEmpty } = useRequestVacationContext()
  const { t } = useTranslation('requestVacation')
  const { user } = useUserContext()

  const isVisible = isFormEmpty && user !== null

  return (
    <ActionModal
      isVisible={isVisible}
      onUserAction={() => setIsFormEmpty(false)}
      label={t('understand')}
      variant="error"
      header={t('addRequestValidation')}
      onBackdropPress={() => setIsFormEmpty(false)}
      extraStyle={{ paddingBottom: 40 }}
    />
  )
}
