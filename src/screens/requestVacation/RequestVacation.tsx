import React, { FC, useEffect, useState } from 'react'
import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { StatusBar } from 'react-native'
import { FirstStepRequestVacation } from './components/FirstStepRequestVacation'
import { SecondStepRequestVacation } from './components/SecondStepRequestVacation'
import { useNavigation } from '@react-navigation/core'
import { HeaderRequestVacation } from './components/HeaderRequestVacation'

export const RequestVacation: FC = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const [step, setStep] = useState<number>(0)
  const navigation = useNavigation()

  return (
    <SafeAreaWrapper>
      <HeaderRequestVacation />
      <Box margin="l">
        {step === 0 && <FirstStepRequestVacation onClickNext={() => setStep(1)} />}
        {step === 1 && <SecondStepRequestVacation />}
      </Box>
    </SafeAreaWrapper>
  )
}
