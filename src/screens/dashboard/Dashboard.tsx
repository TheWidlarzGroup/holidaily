import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Box, Text } from 'utils/theme'

export const Dashboard = () => (
  <SafeAreaView style={styles.safeArea}>
    <Box margin="xl">
      <Text variant="title1">Welcome in dashboard</Text>
    </Box>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
})
