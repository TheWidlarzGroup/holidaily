import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppNavigationType } from '../../navigation/types'

const TestScreen = () => {
  const navigation = useNavigation<AppNavigationType<'TestScreen'>>()

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Pressable onPress={goBack}>
        <Text>Go back</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default TestScreen
