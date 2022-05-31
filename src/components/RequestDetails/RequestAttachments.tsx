import { DayOffRequest } from 'mockApi/models'
import React from 'react'
import {
  Attachments,
  AttachmentWrapper,
} from 'screens/requestVacation/components/additionals/Attachments'
import { Box } from 'utils/theme/index'

export const RequestAttachments = ({
  attachments,
}: {
  attachments: DayOffRequest['attachments']
}) => (
  <>
    {!!attachments?.length && (
      <Box flexDirection="row" flexWrap="wrap">
        <Attachments attachments={attachments} imagesPerScreenWidth={4} />
      </Box>
    )}
  </>
)
