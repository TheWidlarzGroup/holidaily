import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { LoadingModal } from 'components/LoadingModal'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useGetPostsData } from 'dataAccess/queries/useFeedPostsData'
import { useLanguage } from 'hooks/useLanguage'
import { FeedPost as FeedPostType } from 'mock-api/models/miragePostTypes'
import { BottomTabNavigationProps, BottomTabNavigationType } from 'navigation/types'
import { InteractionManager } from 'react-native'
import { OptionsModal } from 'components/OptionsModal'
import { MessageInputModal } from 'components/MessageInputModal'
import { PrevScreen, usePrevScreenBackHandler } from 'hooks/usePrevScreenBackHandler'
import { FlashList } from '@shopify/flash-list'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { useMemoizedNonNullValue } from 'hooks/memoization/useMemoizedNonNullValue'
import { isIos } from 'utils/layout'
import { mkUseStyles, Theme } from 'utils/theme'
import { FeedHeader } from './components/FeedHeader/FeedHeader'
import { FeedPost } from './components/FeedPost/FeedPost'
import { useFeedModals } from './useFeedModals'

const ESTIMATED_POST_HEIGHT = 746

type NavigationHookType = BottomTabNavigationType<'FEED'> & typeof DrawerActions

// eslint-disable-next-line react/no-unused-prop-types
type RenderItemType = { item: FeedPostType }

export const Feed = ({ route: { params: p } }: BottomTabNavigationProps<'FEED'>) => {
  const [language] = useLanguage()
  const styles = useStyles()
  const { data } = useGetPostsData()
  const navigation = useNavigation<NavigationHookType>()
  const flatListRef = useRef<FlashList<FeedPostType> | null>(null)
  const scrollRetries = useRef(0)

  const {
    onCommentEdit,
    handleSetMessageContent,
    closeOptionsModal,
    closeMessageInput,
    isMessageInputOpen,
    isOptionsModalOpen,
    setEditTarget,
    editTarget,
    openEditModal,
    modalOptions,
  } = useFeedModals(data)
  const [wasFlashListLoaded, setWasFlashListLoaded] = useState(false)

  const prevScreen: PrevScreen = p?.prevScreen

  const memoizedPrevScreen = useMemoizedNonNullValue(prevScreen)

  const wasNavigatedFromNotifications = memoizedPrevScreen[0] === 'NOTIFICATIONS'

  usePrevScreenBackHandler(prevScreen)

  useEffect(() => {
    const removeListener = navigation.addListener('blur', () => {
      scrollRetries.current = 0
      navigation.setParams({ postId: undefined })
    })
    return removeListener
  }, [navigation])

  useEffect(() => {
    const parent = navigation.getParent()
    if (wasNavigatedFromNotifications) {
      parent?.setOptions({ swipeEnabled: false })
    }
  }, [navigation, wasNavigatedFromNotifications])

  InteractionManager.runAfterInteractions(() => {
    if (flatListRef.current && p?.postId && !!data?.length && wasFlashListLoaded) {
      const index = data.findIndex((post) => String(post.id) === String(p.postId))
      if (index && index >= 0 && index < data.length) {
        flatListRef.current.scrollToIndex({ index, animated: true })
      }
    }
  })

  const renderItem = useCallback(
    ({ item }: RenderItemType) => (
      <FeedPost
        post={item}
        openEditModal={openEditModal}
        editTarget={editTarget}
        wasNavigatedFromNotifications={wasNavigatedFromNotifications}
      />
    ),
    [editTarget, openEditModal, wasNavigatedFromNotifications]
  )

  const keyExtractor = (post: FeedPostType) => post.id

  const onListLoad = () => setWasFlashListLoaded(true)

  const clearEditTarget = () => setEditTarget(null)

  const handleGoBack = () => {
    if (wasNavigatedFromNotifications) {
      navigation.navigate('NOTIFICATIONS')
    }
  }

  const contentContainerStyle = {
    paddingBottom: 90,
    paddingTop: isIos ? 36 : 22,
    backgroundColor: styles.background.color,
  }

  if (!data) return <LoadingModal show />

  const allPosts = data.sort((a, b) => b.createdAt - a.createdAt)

  return (
    <SafeAreaWrapper isDefaultBgColor edges={['left', 'right', 'bottom']}>
      <GestureRecognizer onSwipeRight={handleGoBack} iosOnly>
        <FlashList
          ref={flatListRef}
          onLoad={onListLoad}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={FeedHeader}
          data={allPosts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          extraData={[language, editTarget]}
          contentContainerStyle={contentContainerStyle}
          estimatedItemSize={ESTIMATED_POST_HEIGHT}
          disableAutoLayout
        />
      </GestureRecognizer>
      <OptionsModal
        options={modalOptions}
        isOpen={isOptionsModalOpen}
        onHide={closeOptionsModal}
        onSwipeComplete={clearEditTarget}
        onBackdropPress={clearEditTarget}
        backdropColor="transparent"
      />
      <MessageInputModal
        messageContent={editTarget?.type === 'comment' && editTarget?.text ? editTarget?.text : ''}
        setMessageContent={handleSetMessageContent}
        visible={isMessageInputOpen}
        onSubmitEditing={closeMessageInput}
        onRequestClose={closeMessageInput}
        handleEditComment={onCommentEdit}
        autofocus
      />
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  background: {
    color: theme.colors.dashboardBackground,
  },
}))
