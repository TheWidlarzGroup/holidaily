import React from 'react'
import { Box } from 'utils/theme'
import { Photo } from '../Photo'
import { AddMore } from './AddMore'

type AttachmentProps = {
  photos: { id: string; uri: string }[]
  removePhoto: F1<string>
  addMore: F0
  displayAddMore: boolean
}

export const Attachments = ({ photos, addMore, displayAddMore, removePhoto }: AttachmentProps) => {
  const getPadding = (index: number, side: 'right' | 'left') => {
    const n = index % 3
    const paddingSize = 2
    if (n === 0) return side === 'left' ? 0 : 2 * paddingSize
    if (n === 2) return side === 'left' ? 2 * paddingSize : 0
    if (n === 1) return paddingSize
  }

  return (
    <Box alignSelf="stretch">
      <Box flexDirection="row" flexWrap="wrap">
        {photos.map(({ uri, id }, uriIndex) => (
          <Box
            key={id}
            paddingTop="s"
            style={{
              paddingLeft: getPadding(uriIndex, 'left'),
              paddingRight: getPadding(uriIndex, 'right'),
              width: '33.33%',
            }}>
            <Photo src={uri} onClose={() => removePhoto(id)} displayClose />
          </Box>
        ))}
        {photos.length % 3 !== 0 && displayAddMore && (
          <Box flexDirection="row" justifyContent="flex-end" flex={1}>
            <AddMore onPress={addMore} />
          </Box>
        )}
      </Box>
      {photos.length % 3 === 0 && displayAddMore && <AddMore onPress={addMore} />}
    </Box>
  )
}
