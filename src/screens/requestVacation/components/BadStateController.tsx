import { useNavigation } from '@react-navigation/native'
import { BottomModal } from 'components/BottomModal'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { AppNavigationType } from 'navigation/types'
import React from 'react'
import { useRequestVacationContext } from '../contexts/RequestVacationContext'
import { MaxSickdays } from './MaxSickDays'
import { NotEnoughPTO } from './NotEnoughPTO'

export const BadStateController = () => {
  const { sickTime, isPeriodInvalid } = useRequestVacationContext()
  const navigation = useNavigation<AppNavigationType<'REQUEST_VACATION_CALENDAR'>>()
  const { user } = useUserContext()

  if (isPeriodInvalid && user)
    return (
      <BottomModal isVisible isInvalid>
        <NotEnoughPTO
          origin="form"
          onPress={() => navigation.navigate('REQUEST_VACATION_CALENDAR', { isSickTime: sickTime })}
          availablePto={user.availablePto}
          customError={sickTime ? <MaxSickdays /> : null}
        />
      </BottomModal>
    )
  return null
}
