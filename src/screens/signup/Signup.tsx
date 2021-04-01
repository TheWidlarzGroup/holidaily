import React, { FC } from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '../../utils/theme/index'
import { AppNavigationType } from '../../navigation/types'

export const Signup: FC = () => {
  const navigation = useNavigation<AppNavigationType<'Signup'>>()

  const navigateToLogin = () => {
    navigation.navigate('Login')
  }
  return (
    <SafeAreaView>
      <Pressable onPress={navigateToLogin}>
        <Text>Login Screen</Text>
      </Pressable>
    </SafeAreaView>
  )
}
