import React, { FC } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 50,
    width: '90%',
    maxWidth: 400,
    height: 400,
    borderRadius: 12,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
})

interface SliderContentProps {
  title: string
  text: string
  image: any
}

const SliderContent: FC<SliderContentProps> = ({ title, text, image }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={image} />
    <Text style={styles.title}>{title}</Text>
    <Text>{text}</Text>
  </View>
)

export default SliderContent
