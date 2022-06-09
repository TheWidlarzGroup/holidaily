import React from 'react'
import { BottomModal } from 'components/BottomModal'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'
import { EmptyForm } from './EmptyForm'

export const AddButtonValidation = () => {
  const { isFormEmpty, setIsFormEmpty } = useRequestVacationContext()
  const { user } = useUserContext()

  if (isFormEmpty && user)
    return (
      <BottomModal isVisible isInvalid>
        <EmptyForm onPress={() => setIsFormEmpty(false)} />
      </BottomModal>
    )
  return null
}
