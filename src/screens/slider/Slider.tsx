import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB051',
  },
})

const Slider = () => (
  <SafeAreaView style={styles.container}>
    <Text>Slider Screen</Text>
  </SafeAreaView>
)

export default Slider
