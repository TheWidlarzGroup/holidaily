import React, { FC, useEffect, useState } from 'react'

import { Box, Text } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { StatusBar } from 'react-native'
import { FirstStepRequestVacation } from './components/FirstStepRequestVacation'
import { SecondStepRequestVacation } from './components/SecondStepRequestVacation'
import { ProgressBar } from 'components/ProgressBar'
import { AnimatedBar } from 'components/AnimatedBar'

export const RequestVacation: FC = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    return () => {
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const [step, setStep] = useState<number>(0)

  return (
    <SafeAreaWrapper>
      <Box margin="l">
        <AnimatedBar margin={30} marginSide={'bottom'} />
        {step === 0 && <FirstStepRequestVacation onClickNext={() => setStep(1)} />}
      </Box>
      <Box margin="l">{step === 1 && <SecondStepRequestVacation />}</Box>
    </SafeAreaWrapper>
  )
}
