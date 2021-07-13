import React, { useEffect, useRef, useState } from 'react'
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const big =
  'M240 125C240 188.513 188.513 240 125 240C61.4873 240 10 188.513 10 125C10 61.4873 61.4873 10 125 10C188.513 10 240 61.4873 240 125Z'
const small =
  'M250 125C250 130.523 245.523 135 240 135C234.477 135 230 130.523 230 125C230 119.477 234.477 115 240 115C245.523 115 250 119.477 250 125Z'
const checkmark = 'M88 130L110.559 152.647L163 100'

const vWidth = 55
const vHeight = 55

const CheckmarkLoading = ({ callback, loading }: { callback: () => void; loading: boolean }) => {
  const progress = useSharedValue(1)
  const progress2 = useSharedValue(0)
  const progress3 = useSharedValue(0)
  const [elipseLength, setElipseLength] = useState(0)
  const [checkmarkLength, setCheckmarkLength] = useState(0)
  const elipseRef = useRef<any>(null)
  const checkmarkRef = useRef<any>(null)

  useEffect(() => {
    if (loading) {
      progress.value = withRepeat(
        withSequence(withTiming(0.75, { duration: 1000 }), withTiming(1, { duration: 500 })),
        -1,
        false
      )
      progress2.value = withRepeat(
        withTiming(2, { duration: 1500, easing: Easing.linear }),
        -1,
        false
      )
    } else {
      cancelAnimation(progress)
      cancelAnimation(progress2)
      cancelAnimation(progress3)
      progress.value = withSequence(
        withTiming(0.75, { duration: 1000 }),
        withTiming(1, { duration: 500 })
      )
      progress2.value = withTiming(2, { duration: 1500, easing: Easing.linear }, () => {
        progress3.value = withTiming(1, { duration: 500 }, () => runOnJS(callback)())
      })
    }
  }, [callback, loading, progress, progress2, progress3])

  const elipseProps = useAnimatedProps(() => ({
    strokeDashoffset: elipseLength - progress.value * elipseLength,
  }))
  const smallElipseProps = useAnimatedProps(() => ({
    opacity: 1 - progress3.value,
  }))
  const checkmarkProps = useAnimatedProps(() => ({
    opacity: progress2.value,
    strokeDashoffset: checkmarkLength - progress3.value * checkmarkLength,
  }))
  const rotation = useAnimatedStyle(
    () => ({
      transform: [
        { rotate: `${interpolate(progress2.value, [0, 1], [0, 360])}deg` },
        { rotateZ: '180deg' },
        { rotateY: '180deg' },
      ],
    }),
    [progress2.value]
  )
  return (
    <Animated.View style={rotation}>
      <Svg width={vWidth} height={vHeight} viewBox="0 0 250 250">
        <>
          <AnimatedPath
            animatedProps={elipseProps}
            // @ts-ignore:
            onLayout={() => setElipseLength(elipseRef.current.getTotalLength())}
            ref={elipseRef}
            d={big}
            stroke="black"
            strokeWidth={10}
            strokeDasharray={elipseLength}
          />
          <AnimatedPath animatedProps={smallElipseProps} d={small} fill="black" />
          <AnimatedPath
            animatedProps={checkmarkProps}
            // @ts-ignore:
            onLayout={() => setCheckmarkLength(checkmarkRef.current.getTotalLength())}
            ref={checkmarkRef}
            d={checkmark}
            stroke="black"
            strokeWidth={10}
            origin={125}
            rotation={180}
            scaleX={-1}
            strokeDasharray={checkmarkLength}
          />
        </>
      </Svg>
    </Animated.View>
  )
}

export default CheckmarkLoading
