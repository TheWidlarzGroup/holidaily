import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import React, { useEffect } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Box, mkUseStyles, Text, useColors } from 'utils/theme'
import { Loader } from './Loader'

type LoadingModalProps = {
  show: boolean
}

export const LoadingModal = ({ show }: LoadingModalProps) => {
  const styles = useStyles()
  const colors = useColors()
  const { height } = useDimensions()
  const loaderProgress = useSharedValue(0)

  useEffect(() => {
    const interval = setInterval(() => {
      loaderProgress.value += 0.02
    }, 30)
    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!show) return null

  return (
    <Box style={[styles.container, { height: height + 120 }]}>
      <Loader
        progress={loaderProgress}
        size={40}
        frontLayerColor={colors.secondary}
        backLayerColor={colors.lightGrey}
        strokeWidth={4}
      />
      <Text variant="boldOrange15" marginTop="l">
        Wait a second...
      </Text>
    </Box>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: 'rgba(255, 255, 255, .8)',
    position: 'absolute',
    left: -50,
    right: -50,
    bottom: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
