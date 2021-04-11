import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AppNavigationType } from '../../navigation/types'
import { Box, Text } from '../../utils/theme'

export const Home = () => {
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
