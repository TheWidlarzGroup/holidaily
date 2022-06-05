import React from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import GestureRecognizer from 'react-native-swipe-gestures'
import { useNavigation } from '@react-navigation/native'
import { Policies } from './components/Policies'
import { PolicyHeader } from './components/PolicyHeader'

export const PtoPolicy = () => {
  const { goBack } = useNavigation()
  return (
    <SafeAreaWrapper>
      <GestureRecognizer onSwipeRight={goBack}>
        <PolicyHeader />
        <Policies />
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}
