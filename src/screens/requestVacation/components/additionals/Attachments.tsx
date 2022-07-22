import React from 'react'
import { BaseOpacity, Box, mkUseStyles, Text, theme } from 'utils/theme'
import { Photo } from 'components/RequestDetails/Photo'
import { CircleStatusIcon } from 'components/CircleStatusIcon'
import { windowWidth } from 'utils/deviceSizes'
import { AttachmentDataType } from 'mockApi/models/miragePostTypes'
import { AddMore } from './AddMore'

type AttachmentsProps = {
  attachments: (AttachmentDataType & { name?: string })[]
  removeAttachment?: F1<string>
  imagesPerScreenWidth: 2 | 4
  addMore?: F0
  displayAddMore?: boolean
  disableDeleteImgOnPress?: true
}

type AttachmentWrapperProps = {
  uri: string
  imageWidth?: number
  onClose?: F0
  fileName?: string
  disableDeleteImgOnPress?: true
}

const CONTAINER_TOTAL_HORIZONTAL_MARGINS = 24
const IMAGE_SHORT_PADDING = 'xs' // for 4 images per screen width
const IMAGE_WIDE_PADDING = 's' // for 2 images per screen width

export const Attachments = ({
  attachments,
  addMore,
  displayAddMore,
  removeAttachment,
  imagesPerScreenWidth,
  disableDeleteImgOnPress,
}: AttachmentsProps) => {
  const styles = useStyles()

  const singleImageTotalPaddings =
    imagesPerScreenWidth === 4
      ? 2 * theme.spacing[IMAGE_SHORT_PADDING]
      : 2 * theme.spacing[IMAGE_WIDE_PADDING]
  const imageWidth =
    (windowWidth -
      CONTAINER_TOTAL_HORIZONTAL_MARGINS -
      singleImageTotalPaddings * imagesPerScreenWidth) /
    imagesPerScreenWidth

  const isRowFull = attachments.length % imagesPerScreenWidth === 0
  return (
    <Box alignSelf="stretch" style={styles.container} marginHorizontal="-s">
      <Box flexDirection="row" flexWrap="wrap">
        {attachments.map((attachment) => (
          <Box
            key={attachment.id}
            padding={imagesPerScreenWidth === 4 ? IMAGE_SHORT_PADDING : IMAGE_WIDE_PADDING}>
            <AttachmentWrapper
              onClose={removeAttachment ? () => removeAttachment(attachment.id) : undefined}
              uri={attachment.uri}
              fileName={attachment.name}
              imageWidth={imageWidth}
              disableDeleteImgOnPress={disableDeleteImgOnPress}
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
      onPress={p.disableDeleteImgOnPress ? () => null : p.onClose}
      activeOpacity={p.onClose && !p.disableDeleteImgOnPress ? 0.8 : 1}
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
