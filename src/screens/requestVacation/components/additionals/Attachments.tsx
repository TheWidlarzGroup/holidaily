import React from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import Cross from 'assets/icons/circle-cross.svg'
import { Photo } from '../Photo'
import { AddMore } from './AddMore'

type AttachmentProps = {
  attachments: (AttachmentType | (AttachmentType & { name: string }))[]
  removeAttachment: F1<string>
  addMore: F0
  displayAddMore?: boolean
}

type Side = 'right' | 'left' | 'top'

export const Attachments = ({
  attachments,
  addMore,
  displayAddMore,
  removeAttachment,
}: AttachmentProps) => {
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
        {attachments.map((attachment, uriIndex) => (
          <Box
            key={attachment.id}
            style={{
              paddingTop: getPadding(0, 'top'),
              paddingLeft: getPadding(uriIndex, 'left'),
              paddingRight: getPadding(uriIndex, 'right'),
              width: '33.33%',
            }}>
            {'name' in attachment ? (
              <Box alignItems="center" justifyContent="center">
                <BaseOpacity
                  alignSelf="flex-end"
                  onPress={() => removeAttachment(attachment.id)}
                  hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
                  <Cross width={18} height={18} />
                </BaseOpacity>
                <Text>{attachment.name}</Text>
              </Box>
            ) : (
              <Photo
                src={attachment.uri}
                onClose={() => removeAttachment(attachment.id)}
                displayClose
              />
            )}
          </Box>
        ))}
        {attachments.length % 3 !== 0 && displayAddMore && (
          <Box flexDirection="row" justifyContent="flex-end" flex={1}>
            <AddMore onPress={addMore} />
          </Box>
        )}
      </Box>
      {attachments.length % 3 === 0 && displayAddMore && <AddMore onPress={addMore} />}
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
}))
