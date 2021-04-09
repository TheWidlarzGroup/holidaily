import React, { useCallback, useEffect } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppNavigationType } from '../../navigation/types'
import { Box, Text } from '../../utils/theme'
import { Mutation } from 'react-query/types/core/mutation'
import { confirmAccount } from '../../graphql/mutations/confirmAccount'

type RouteProps = {
  key: string
  name: string
  params: {
    token: string
  }
}

export const Home = () => {
  const {
    params: { token },
  } = useRoute<RouteProps>() || { params: { token: '' } }

  useEffect(() => {
    Alert.alert('token', token)
  }, [token])

  const navigation = useNavigation<AppNavigationType<'Home'>>()
  const navigateToTestScreen = useCallback(() => {
    navigation.navigate('TestScreen')
  }, [navigation])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box margin="m">
        <Text variant="title1">Home Screen</Text>
      </Box>
      <Box margin="m">
        <Pressable onPress={navigateToTestScreen}>
          <Text variant="body1">Go to Test Screen</Text>
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
