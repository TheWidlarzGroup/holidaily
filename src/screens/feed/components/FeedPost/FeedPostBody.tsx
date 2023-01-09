import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { Box, Colors } from 'utils/theme'
import { ExpandingText } from 'components/ExpandingText'
import { Gallery } from 'components/Gallery/Gallery'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationType } from 'navigation/types'
import { isIos } from 'utils/layout'

type FeedPostBodyProps = {
  borderColor: Colors
  post: Pick<FeedPost, 'data' | 'text' | 'id' | 'location'>
  wasNavigatedFromNotifications?: boolean
}

export const FeedPostBody = (props: FeedPostBodyProps) => {
  const { post, borderColor, wasNavigatedFromNotifications } = props
  const { data, text, id } = post
  const { navigate } = useNavigation<AppNavigationType<'GALLERY'>>()
  const handleGalleryItemPress = (index: number) => {
    navigate('GALLERY', { data, index, postId: id })
  }

  return (
    <Box paddingBottom="xxs">
      {text?.length > 0 && (
        <Box
          paddingTop="xm"
          marginBottom="-s"
          paddingHorizontal="m"
          borderWidth={2}
          borderColor={borderColor}
          borderBottomWidth={0}
          borderTopWidth={0}
          paddingBottom={data?.length === 0 && isIos ? 'xl' : 'none'}>
          <ExpandingText text={text} location={post.location} />
        </Box>
      )}
      {data?.length > 0 ? (
        <Gallery
          data={data}
          postId={id}
          onItemPress={handleGalleryItemPress}
          wasNavigatedFromNotifications={wasNavigatedFromNotifications}
        />
      ) : null}
    </Box>
  )
}
