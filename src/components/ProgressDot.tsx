import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated'
import { Analytics } from 'services/analytics'
import { colors } from 'utils/theme/colors'
import { mkUseStyles } from 'utils/theme/index'

const { width } = Dimensions.get('window')

type ProgressDotProps = {
  index: number
  scrollPositionX: Animated.SharedValue<number>
  postPagination?: true
  postId?: string
}

export const ProgressDot = ({
  scrollPositionX,
  index,
  postPagination,
  postId,
}: ProgressDotProps) => {
  const styles = useStyles()
  const sliderDotColors = [colors.white, colors.black, colors.white]
  const postDotColors = [colors.paginationDot, colors.tertiary, colors.paginationDot]
  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollPositionX.value,
      [width * (index - 1), width * index, width * (index + 1)],
      postPagination ? postDotColors : sliderDotColors
    )

    return { backgroundColor }
  })

  useEffect(() => {
    if (postId) Analytics().track('POST_SLIDE_CHANGED', { postId, slideNumber: index })
  }, [postId, index])

  return <Animated.View style={[style, styles.dot, postPagination && styles.smallDot]} />
}

const useStyles = mkUseStyles(() => ({
  dot: {
    margin: 5,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  smallDot: {
    width: 8,
    height: 8,
  },
}))
