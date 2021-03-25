import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {},
})

interface SliderContentProps {
  title: string
  text: string
}

const SliderContent: FC<SliderContentProps> = ({ title, text }) => (
  <View style={styles.container}>
    <Text>{title}</Text>
    <Text>{text}</Text>
  </View>
)

export default SliderContent
