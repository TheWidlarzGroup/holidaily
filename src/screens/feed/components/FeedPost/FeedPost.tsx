import React, { useEffect, useState } from 'react'
import { FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import { Box } from 'utils/theme'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { FeedPostBody } from './FeedPostBody'
import { FeedPostFooter } from './FeedPostFooter'
import { FeedPostHeader } from './FeedPostHeader'

type FeedPostProps = {
  post: FeedPostType
}

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const FeedPost = ({ post }: FeedPostProps) => {
  const [showBorder, setShowBorder] = useState(true)
  const animProgress = useSharedValue(post.recentlyAdded ? 0 : 11)
  useEffect(() => {
    animProgress.value = withTiming(11, { duration: 800, easing: Easing.exp })
  }, [animProgress])

  useEffect(() => {
    setShowBorder(true)
    setTimeout(() => {
      setShowBorder(false)
    }, 3000)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: `${animProgress.value * 100}%`,
    opacity: animProgress.value,
  }))

  return (
    <AnimatedBox
      style={[animatedStyle]}
      overflow="hidden"
      bg="white"
      borderTopLeftRadius="lmin"
      borderTopRightRadius="lmin"
      marginTop="s">
      <FeedPostHeader post={post} showBorder={showBorder} />
      <FeedPostBody post={post} showBorder={showBorder} />
      <FeedPostFooter post={post} showBorder={showBorder} />
    </AnimatedBox>
  )
}
