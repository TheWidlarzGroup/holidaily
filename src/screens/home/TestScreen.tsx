import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppNavigationType } from '../../navigation/types'
import { Box, Text } from '../../utils/theme'

export const TestScreen = () => {
  const navigation = useNavigation<AppNavigationType<'TestScreen'>>()

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box margin="m">
        <Text variant="title1">Home Screen</Text>
      </Box>
      <Box margin="m">
        <Pressable onPress={goBack}>
          <Text>Go back</Text>
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
