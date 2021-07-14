import React, { ComponentClass, useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Color, Path, PathProps } from 'react-native-svg'

type LayoutTypes = {
  onLayout?: (event: LayoutChangeEvent) => void
}
const AnimatedPath: ComponentClass<Animated.AnimateProps<PathProps> & LayoutTypes, any> =
  Animated.createAnimatedComponent(Path)

const Checkmark = ({
  start,
  color,
  onFinish,
  width = 8,
}: {
  start: boolean
  color: Color
  onFinish: () => void
  width?: number
}) => {
  const progress = useSharedValue(0)
  const [checkmarkLength, setCheckmarkLength] = useState(0)
  const checkmarkRef = useRef<typeof AnimatedPath | any>(null)

  useEffect(() => {
    if (start) progress.value = withTiming(1, { duration: 500 }, () => runOnJS(onFinish)())
  }, [onFinish, progress, start])

  const checkmarkProps = useAnimatedProps(() => ({
    opacity: progress.value === 0 ? 0 : 1,
    strokeDashoffset: checkmarkLength - progress.value * checkmarkLength,
  }))

  return (
    <Svg width="25" height="25" viewBox="0 0 100 100">
      <AnimatedPath
        animatedProps={checkmarkProps}
        onLayout={() => setCheckmarkLength(checkmarkRef?.current?.getTotalLength())}
        ref={checkmarkRef}
        id="checkmark"
        d="M13 54L35.5586 76.6471L88 24"
        stroke={color}
        strokeWidth={width}
        strokeDasharray={checkmarkLength}
      />
    </Svg>
  )
}

export default Checkmark
