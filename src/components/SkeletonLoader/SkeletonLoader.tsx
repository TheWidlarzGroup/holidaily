import React from 'react'
import { StyleSheet } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'

import { Box, theme } from 'utils/theme'
import LinearGradient from 'react-native-linear-gradient'
import { AnimatedBox } from '../AnimatedBox'
import { useSkeletonLoader } from './useSkeletonLoader'

type Props = {
  children: React.ReactElement
  width: number
  isLoading: boolean
}

export const SkeletonLoader = (props: Props) => {
  const { animatedStyle } = useSkeletonLoader(props.width)

  if (!props.isLoading) {
    return props.children
  }

  return (
    <MaskedView maskElement={props.children} style={{ aspectRatio: 4 / 5, width: props.width }}>
      <AnimatedBox style={[StyleSheet.absoluteFill, animatedStyle]} width={props.width}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={['transparent', theme.colors.grey, 'transparent']}
            />
          }>
          <Box style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.grey }]} />
        </MaskedView>
      </AnimatedBox>
    </MaskedView>
  )
}
