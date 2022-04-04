import React from 'react'
import { Box, Text } from 'utils/theme/index'
import { Photo } from './Photo'

type Side = 'left' | 'right'
type RequestAttachmentsProps = {
  attachments?: { id: string; uri: string; name?: string }[]
}

export const RequestAttachments = ({ attachments }: RequestAttachmentsProps) => {
  const getPadding = (index: number, side: Side) => {
    const n = index % 3
    const paddingSize = 2
    if (n === 0) return side === 'left' ? 0 : 2 * paddingSize
    if (n === 1) return paddingSize
    if (n === 2) return side === 'left' ? 2 * paddingSize : 0
  }
  return (
    <>
      {!!attachments?.length && (
        <Box flexDirection="row" flexWrap="wrap">
          {attachments.map((attachment, uriIndex) => (
            <Box
              key={attachment.id}
              paddingTop="s"
              style={{
                paddingLeft: getPadding(uriIndex, 'left'),
                paddingRight: getPadding(uriIndex, 'right'),
                width: '33.33%',
              }}>
              {'name' in attachment ? (
                <Text>{attachment.name}</Text>
              ) : (
                <Photo src={attachment.uri} onClose={() => {}} />
              )}
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}
