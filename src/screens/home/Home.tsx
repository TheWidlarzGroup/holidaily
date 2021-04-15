import React, { useCallback, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, Text } from 'utils/theme'
import { AppNavigationType } from 'navigation/types'
import { UserContext } from 'contexts/UserContext'

export const Home = () => {
  const navigation = useNavigation<AppNavigationType<'Home'>>()
  const { user } = useContext(UserContext)

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
          user.firstName ? user.firstName + ' ' + user.lastName : 'Guest'
        }`}</Text>
        <Text variant="lightGreyRegular" textAlign="center">
          {user.email}
        </Text>
      </Box>
      <Box margin="m">
        <Pressable onPress={navigateToLogin}>
          <Text variant="body1">Login</Text>
        </Pressable>
      </Box>
      <Box margin="m">
        <Pressable onPress={navigateToSignup}>
          <Text variant="body1">Signup</Text>
        </Pressable>
      </Box>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
