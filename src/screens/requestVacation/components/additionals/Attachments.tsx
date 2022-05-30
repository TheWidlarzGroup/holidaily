import React from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import { Photo } from 'components/RequestDetails/Photo'
import { CircleStatusIcon } from 'components/CircleStatusIcon'
import { AddMore } from './AddMore'

type AttachmentsProps = {
  attachments: (AttachmentType & { name?: string })[]
  removeAttachment: F1<string>
  addMore: F0
  displayAddMore?: boolean
}

type AttachmentWrapperProps = {
  onClose?: F0
  uri: string
  fileName?: string
}
type PaddingSide = 'right' | 'left' | 'top'

export const Attachments = ({
  attachments,
  addMore,
  displayAddMore,
  removeAttachment,
}: AttachmentsProps) => {
  const styles = useStyles()
  const getPadding = (index: number, side: PaddingSide) => {
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
              paddingLeft: getPadding(uriIndex, 'left'),
              paddingRight: getPadding(uriIndex, 'right'),
            }}>
            <AttachmentWrapper
              onClose={() => removeAttachment(attachment.id)}
              uri={attachment.uri}
              fileName={attachment.name}
            />
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
export const AttachmentWrapper = (p: AttachmentWrapperProps) => (
  <>
    {p.onClose && (
      <BaseOpacity
        position="absolute"
        zIndex="10"
        right={-10}
        top={-5}
        onPress={p.onClose}
        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
        <CircleStatusIcon status="error" bg="grey" height={20} />
      </BaseOpacity>
    )}
    <BaseOpacity
      onPress={p.onClose}
      width={80}
      aspectRatio={1}
      borderRadius="l1min"
      overflow="hidden"
      bg="attachmentBg"
      marginBottom="xs">
      {p.fileName ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text style={{ flexWrap: 'wrap' }} lineBreakMode="tail" ellipsizeMode="tail">
            {p.fileName}
          </Text>
        </Box>
      ) : (
        <Photo src={p.uri} />
      )}
    </BaseOpacity>
  </>
)

const useStyles = mkUseStyles(() => ({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
}))
