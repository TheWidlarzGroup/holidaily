import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { Box } from 'utils/theme'
import { ExpandingText } from 'components/ExpandingText'
import { Gallery } from 'components/Gallery/Gallery'
import { useNavigation } from '@react-navigation/native'
import { ModalNavigationType } from 'navigation/types'

type FeedPostBodyProps = Pick<FeedPost, 'data' | 'text'>

export const FeedPostBody = ({ data, text }: FeedPostBodyProps) => {
  const { navigate } = useNavigation<ModalNavigationType<'GALLERY'>>()
  const handleGalleryItemPress = (index: number) => {
    navigate('GALLERY', { data, index })
  }
  return (
    <Box>
      {text.length > 0 && (
        <Box paddingHorizontal="m" paddingVertical="s">
          <ExpandingText text={text} />
        </Box>
      )}
      {data?.length > 0 ? <Gallery data={data} onItemPress={handleGalleryItemPress} /> : null}
    </Box>
  )
}
