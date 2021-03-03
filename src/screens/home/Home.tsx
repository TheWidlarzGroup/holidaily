import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppNavigationType } from '../../navigation/types'

const Home = () => {
  const navigation = useNavigation<AppNavigationType<'Home'>>()

  const navigateToTestScreen = useCallback(() => {
    navigation.navigate('TestScreen')
  }, [navigation])

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Pressable onPress={navigateToTestScreen}>
        <Text>Go to Test Screen</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Home
