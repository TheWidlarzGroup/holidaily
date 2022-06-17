import { EditTargetType, FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import React, { useEffect, useState } from 'react'
import { Box } from 'utils/theme'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
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
  const navigation = useNavigation<any>()

  useEffect(() => {
    if (editTarget?.postId === post.id && editTarget.type === 'post') setShowBorder(true)
    else setShowBorder(false)
  }, [post.id, editTarget?.postId, editTarget?.type])

  useEffect(() => {
    animProgress.value = withTiming(11, { duration: 800, easing: Easing.exp })
  }, [animProgress])

  useFocusEffect(
    React.useCallback(() => {
      const { routes } = navigation.getState()
      const getIdParam = routes.slice().pop()?.params?.postId
      const isFromNotifications = getIdParam === Number(post.id)

      if (isFromNotifications) {
        setShowBorder(true)

        setTimeout(() => {
          setShowBorder(false)
        }, 6000)
      }
    }, [navigation, post.id])
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
      marginTop={showBorder ? 'xsplus' : 's'}>
      <FeedPostHeader post={post} openEditModal={openEditModal} showBorder={showBorder} />
      <FeedPostBody post={post} showBorder={showBorder} />
      <FeedPostFooter
        {...props}
        showBorder={showBorder}
        isEditingTarget={editTarget?.type === 'comment' || editTarget?.type === 'post'}
      />
    </AnimatedBox>
  )
}
