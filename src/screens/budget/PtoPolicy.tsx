import React from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useNavigation } from '@react-navigation/native'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { Policies } from './components/Policies'
import { PolicyHeader } from './components/PolicyHeader'

export const PtoPolicy = () => {
  const { goBack } = useNavigation()

  return (
    <SafeAreaWrapper>
      <PolicyHeader />
      <GestureRecognizer onSwipeRight={goBack} onEnded>
        <Policies />
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}
