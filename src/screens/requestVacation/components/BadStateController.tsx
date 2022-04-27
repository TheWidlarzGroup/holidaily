import { useNavigation } from '@react-navigation/native'
import { BottomModal } from 'components/BottomModal'
import { useUserContext } from 'hooks/useUserContext'
import React from 'react'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'
import { MaxSickdays } from './MaxSickDays'
import { NotEnoughPTO } from './NotEnoughPTO'

export const BadStateController = () => {
  const { sickTime, isPeriodInvalid } = useRequestVacationContext()
  const navigation = useNavigation()
  const { user } = useUserContext()

  if (isPeriodInvalid && user)
    return (
      <BottomModal isVisible isInvalid>
        <NotEnoughPTO
          origin="form"
          onPress={() => navigation.navigate('RequestVacationCalendar', { isSickTime: sickTime })}
          availablePto={user.availablePto}
          customError={sickTime ? <MaxSickdays /> : null}
        />
      </BottomModal>
    )
  return null
}
