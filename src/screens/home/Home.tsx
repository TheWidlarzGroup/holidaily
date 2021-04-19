import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, Text } from 'utils/theme'
import { AppNavigationType } from 'navigation/types'
import { useUserContext } from 'hooks/useUserContext'

export const Home = () => {
  const navigation = useNavigation<AppNavigationType<'Home'>>()
  const {
    user: { isConfirmed, firstName, lastName, email },
  } = useUserContext()

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  const navigateToSignup = useCallback(() => {
    navigation.navigate('Signup')
  }, [navigation])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box margin="m">
        <Text variant="title1">{`Hello ${
          firstName && isConfirmed ? firstName + ' ' + lastName : 'Guest'
        }`}</Text>
        <Text variant="lightGreyRegular" textAlign="center">
          {isConfirmed && email}
        </Text>
      </Box>
      <Box margin="m">
        <TouchableOpacity onPress={navigateToLogin}>
          <Text variant="body1">Login</Text>
        </TouchableOpacity>
      </Box>
      <Box margin="m">
        <TouchableOpacity onPress={navigateToSignup}>
          <Text variant="body1">Signup</Text>
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
