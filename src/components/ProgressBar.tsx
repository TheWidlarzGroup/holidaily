import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: '#000',
  },
  dot: {
    margin: 5,
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  progressBar: {
    flexDirection: 'row',
  },
})

interface ProgressBarProps {
  scrollPositionX: number
  slidersCount: number
}

const ProgressBar: FC<ProgressBarProps> = ({ scrollPositionX, slidersCount }) => {
  const mockArr = Array(slidersCount).fill('')

  return (
    <View style={styles.progressBar}>
      {mockArr.map((_, index) => (
        <View style={styles.dot} key={index}></View>
      ))}
    </View>
  )
}

export default ProgressBar
