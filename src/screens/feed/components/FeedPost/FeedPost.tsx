import { EditTargetType, FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import React, { useCallback, useEffect, useState } from 'react'
import { Box, Theme } from 'utils/theme'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { BottomTabRoutes } from 'navigation/types'
import { FeedPostBody } from './FeedPostBody'
import { FeedPostFooter } from './FeedPostFooter'
import { FeedPostHeader } from './FeedPostHeader'

type FeedPostProps = {
  post: FeedPostType
  openEditModal: F1<EditTargetType>
  editTarget?: EditTargetType | null
}

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const FeedPost = (props: FeedPostProps) => {
  const { post, editTarget, openEditModal } = props
  const [showBorder, setShowBorder] = useState(false)
  const animProgress = useSharedValue(post.recentlyAdded ? 0 : 11)
  const route = useRoute<RouteProp<BottomTabRoutes, 'FEED'>>()
  const borderColor: keyof Theme['colors'] = showBorder ? 'special' : 'white'

  useEffect(() => {
    if (editTarget?.postId === post.id && editTarget?.type === 'post') setShowBorder(true)
    else setShowBorder(false)
  }, [post.id, editTarget?.postId, editTarget?.type])

  useEffect(() => {
    animProgress.value = withTiming(11, { duration: 800, easing: Easing.exp })
  }, [animProgress])

  useFocusEffect(
    useCallback(() => {
      const getIdParam = route.params?.postId
      const isFromNotifications = Number(getIdParam) === Number(post.id)

      if (isFromNotifications) {
        setShowBorder(true)

        setTimeout(() => {
          setShowBorder(false)
        }, 6000)
      }
    }, [route, post.id])
  )

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
      <FeedPostHeader post={post} openEditModal={openEditModal} borderColor={borderColor} />
      <FeedPostBody post={post} borderColor={borderColor} />
      <FeedPostFooter
        {...props}
        borderColor={borderColor}
        isEditingTarget={editTarget?.type === 'comment' || editTarget?.type === 'post'}
      />
    </AnimatedBox>
  )
}
