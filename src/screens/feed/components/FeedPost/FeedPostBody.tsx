import React from 'react'
import { FeedPost } from 'screens/feed/types'
import { Box } from 'utils/theme'
import { ExpandingText } from 'components/ExpandingText'
import { Gallery } from '../Gallery/Gallery'

type FeedPostBodyProps = Pick<FeedPost, 'data' | 'text'>

export const FeedPostBody = ({ data, text }: FeedPostBodyProps) => {
  const handlePress = () => {}

  handlePress()

  return (
    <Box>
      <Box paddingHorizontal="m" paddingVertical="s">
        <ExpandingText text={text} />
      </Box>
      {data.length > 0 ? <Gallery data={data} /> : null}
    </Box>
  )
}
