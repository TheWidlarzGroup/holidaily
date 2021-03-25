import React, { FC } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import ProgressBar from './ProgressBar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  image: {
    marginTop: 50,
    width: '90%',
    maxWidth: 400,
    height: 400,
    borderRadius: 12,
  },
  progressBar: {
    flexDirection: 'row',
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
  sliderIndex: number
  slidersCount: number
}

const SliderContent: FC<SliderContentProps> = ({
  title,
  text,
  image,
  sliderIndex,
  slidersCount,
}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={image} />
    <Text style={styles.title}>{title}</Text>
    <Text>{text}</Text>
    <ProgressBar sliderIndex={sliderIndex} slidersCount={slidersCount} />
  </View>
)

export default SliderContent
