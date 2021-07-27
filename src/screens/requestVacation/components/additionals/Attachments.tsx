import React from 'react'
import { Box, mkUseStyles } from 'utils/theme'
import { Photo } from '../Photo'
import { AddMore } from './AddMore'

type AttachmentProps = {
  photos: { id: string; uri: string }[]
  removePhoto: F1<string>
  addMore: F0
  displayAddMore: boolean
}

export const Attachments = ({ photos, addMore, displayAddMore, removePhoto }: AttachmentProps) => {
  const styles = useStyles()
  const getPadding = (index: number, side: 'right' | 'left') => {
    const n = index % 3
    const paddingSize = 4
    if (n === 0) return side === 'left' ? 0 : 2 * paddingSize
    if (n === 1) return paddingSize
    if (n === 2) return side === 'left' ? 2 * paddingSize : 0
  }

  return (
    <Box alignSelf="stretch" style={styles.container}>
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

const useStyles = mkUseStyles((theme) => ({
  container: {
    paddingHorizontal: 10,
    marginTop: 30,
  },
}))
