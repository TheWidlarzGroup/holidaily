import React from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'
import { Box, mkUseStyles } from 'utils/theme'
import { Photo } from '../Photo'
import { AddMore } from './AddMore'

type AttachmentProps = {
  photos: AttachmentType[]
  removePhoto: F1<string>
  addMore: F0
  displayAddMore?: boolean
}

type Side = 'right' | 'left' | 'top'

export const Attachments = ({ photos, addMore, displayAddMore, removePhoto }: AttachmentProps) => {
  const styles = useStyles()
  const getPadding = (index: number, side: Side) => {
    const n = index % 3
    const paddingSize = 4
    if (side === 'top') return 3 * paddingSize
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
            style={{
              paddingTop: getPadding(0, 'top'),
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

const useStyles = mkUseStyles(() => ({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
}))
