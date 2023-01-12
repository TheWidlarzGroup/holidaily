import { EditTargetType, FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import React, { useCallback, useEffect, useState } from 'react'
import { Box, Theme, Text } from 'utils/theme'
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { BottomTabRoutes } from 'navigation/types'
import { AnimatedBox } from 'components/AnimatedBox'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { FeedPostBody } from './FeedPostBody'
import { FeedPostFooter } from './FeedPostFooter'
import { FeedPostHeader } from './FeedPostHeader'

type FeedPostProps = {
  post: FeedPostType
  openEditModal: F1<EditTargetType>
  editTarget?: EditTargetType | null
  wasNavigatedFromNotifications?: boolean
}

const emptyBoxBorder = {
  borderBottomWidth: 2,
  borderLeftWidth: 2,
  borderRightWidth: 2,
}

export const FeedPost = (props: FeedPostProps) => {
  const { post, editTarget, openEditModal, wasNavigatedFromNotifications } = props
  const [showBorder, setShowBorder] = useState(false)
  const animProgress = useSharedValue(post.recentlyAdded ? 0 : 11)
  const route = useRoute<RouteProp<BottomTabRoutes, 'FEED'>>()
  const borderColor: keyof Theme['colors'] = showBorder ? 'special' : 'white'
  const { user } = useUserContext()
  const { t } = useTranslation('feed')

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

  const isPostBlocked = user?.blockedPostsIds?.includes(post.id)

  return (
    <AnimatedBox
      style={[animatedStyle]}
      overflow="hidden"
      bg="white"
      borderTopLeftRadius="lmin"
      borderTopRightRadius="lmin"
      marginTop="s">
      <FeedPostHeader post={post} openEditModal={openEditModal} borderColor={borderColor} />
      {isPostBlocked ? (
        <Box borderColor={borderColor} {...emptyBoxBorder} padding="m" alignItems="center">
          <Text variant="textSM" textAlign="center">
            {t('hiddenPostPlaceholder')}
          </Text>
        </Box>
      ) : (
        <>
          <FeedPostBody
            post={post}
            borderColor={borderColor}
            wasNavigatedFromNotifications={wasNavigatedFromNotifications}
          />
          <FeedPostFooter
            {...props}
            borderColor={borderColor}
            isEditingTarget={!!(editTarget && ['comment', 'post'].includes(editTarget?.type))}
          />
        </>
      )}
    </AnimatedBox>
  )
}
