import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { Box, Theme } from 'utils/theme'
import { ExpandingText } from 'components/ExpandingText'
import { Gallery } from 'components/Gallery/Gallery'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationType } from 'navigation/types'
import { isIos } from 'utils/layout'

type FeedPostBodyProps = {
  borderColor: keyof Theme['colors']
  post: Pick<FeedPost, 'data' | 'text' | 'id'>
}

export const FeedPostBody = (props: FeedPostBodyProps) => {
  const { post, borderColor } = props
  const { data, text, id } = post
  const { navigate } = useNavigation<AppNavigationType<'GALLERY'>>()
  const handleGalleryItemPress = (index: number) => {
    navigate('GALLERY', { data, index, postId: id })
  }

  return (
    <Box>
      {text.length > 0 && (
        <Box
          paddingHorizontal="m"
          paddingTop="s"
          borderWidth={2}
          borderColor={borderColor}
          borderBottomWidth={0}
          borderTopWidth={0}
          paddingBottom={data?.length === 0 && isIos ? 'lplus' : 'none'}>
          <ExpandingText text={text} />
        </Box>
      )}
      {data?.length > 0 ? (
        <Gallery data={data} postId={id} onItemPress={handleGalleryItemPress} />
      ) : null}
    </Box>
  )
}
