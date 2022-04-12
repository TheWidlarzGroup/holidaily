import { useNavigation } from '@react-navigation/native'
import { BottomModal } from 'components/BottomModal'
import { useUserContext } from 'hooks/useUserContext'
import React from 'react'
import { calculatePTO } from 'utils/dates'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'
import { NotEnoughPTO } from './NotEnoughPTO'

export const BadStateController = () => {
  const { startDate, endDate, sickTime } = useRequestVacationContext()
  const navigation = useNavigation()
  const { user } = useUserContext()

  if (sickTime || !user || !startDate) return null
  if (user.availablePto < calculatePTO(startDate, endDate ?? startDate))
    return (
      <BottomModal isVisible isInvalid>
        <NotEnoughPTO
          origin="form"
          onPress={() => navigation.navigate('RequestVacationCalendar', { isSickTime: sickTime })}
          availablePto={user.availablePto}
        />
      </BottomModal>
    )
  return null
}
