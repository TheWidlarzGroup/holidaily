import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Box, Text } from '../../utils/theme'

export const Home = () => (
  <SafeAreaView style={styles.safeArea}>
    <Box margin="m">
      <Text variant="title1">Home Screen</Text>
    </Box>
    <Box margin="m">
      <Pressable>
        <Text variant="body1">Go to Test Screen</Text>
      </Pressable>
    </Box>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
