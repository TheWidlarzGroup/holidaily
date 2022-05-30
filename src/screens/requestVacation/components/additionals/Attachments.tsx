import React from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'
import { BaseOpacity, Box, mkUseStyles, Text, theme } from 'utils/theme'
import { Photo } from 'components/RequestDetails/Photo'
import { CircleStatusIcon } from 'components/CircleStatusIcon'
import { windowWidth } from 'utils/deviceSizes'
import { AddMore } from './AddMore'

type AttachmentsProps = {
  attachments: (AttachmentType & { name?: string })[]
  removeAttachment: F1<string>
  imagesPerScreenWidth: 2 | 4
  addMore?: F0
  displayAddMore?: boolean
}

type AttachmentWrapperProps = {
  uri: string
  imageWidth: number
  onClose?: F0
  fileName?: string
}

const CONTAINER_TOTAL_HORIZONTAL_MARGINS = 24

export const Attachments = ({
  attachments,
  addMore,
  displayAddMore,
  removeAttachment,
  imagesPerScreenWidth,
}: AttachmentsProps) => {
  const styles = useStyles()

  const IMAGE_SHORT_PADDINGS_TOTAL = theme.spacing.xs * 2
  const IMAGE_WIDE_PADDINGS_TOTAL = theme.spacing.s * 2

  const SINGLE_IMAGE_TOTAL_PADDINGS =
    imagesPerScreenWidth === 4 ? IMAGE_SHORT_PADDINGS_TOTAL : IMAGE_WIDE_PADDINGS_TOTAL
  const IMAGE_WIDTH =
    (windowWidth -
      CONTAINER_TOTAL_HORIZONTAL_MARGINS -
      SINGLE_IMAGE_TOTAL_PADDINGS * imagesPerScreenWidth) /
    imagesPerScreenWidth

  const isRowFull = attachments.length % 4 === 0
  return (
    <Box alignSelf="stretch" style={styles.container} marginHorizontal="-s">
      <Box flexDirection="row" flexWrap="wrap">
        {attachments.map((attachment) => (
          <Box key={attachment.id} padding={imagesPerScreenWidth === 4 ? 'xs' : 's'}>
            <AttachmentWrapper
              onClose={() => removeAttachment(attachment.id)}
              uri={attachment.uri}
              fileName={attachment.name}
              imageWidth={IMAGE_WIDTH}
            />
          </Box>
        ))}
        {!isRowFull && displayAddMore && (
          <Box flexDirection="row" justifyContent="flex-end" flex={1}>
            <AddMore onPress={addMore} />
          </Box>
        )}
      </Box>
      {isRowFull && displayAddMore && (
        <Box justifyContent="flex-end" flexDirection="row">
          <AddMore onPress={addMore} />
        </Box>
      )}
    </Box>
  )
}
export const AttachmentWrapper = (p: AttachmentWrapperProps) => (
  <>
    {p.onClose && (
      <BaseOpacity
        position="absolute"
        zIndex="10"
        right={-16}
        top={1}
        onPress={p.onClose}
        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
        <CircleStatusIcon status="error" bg="grey" height={20} />
      </BaseOpacity>
    )}
    <BaseOpacity
      onPress={p.onClose}
      width={p.imageWidth}
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
    marginTop: 20,
  },
}))
