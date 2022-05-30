import { DayOffRequest } from 'mockApi/models'
import React from 'react'
import { AttachmentWrapper } from 'screens/requestVacation/components/additionals/Attachments'
import { Box } from 'utils/theme/index'

export const RequestAttachments = ({
  attachments,
}: {
  attachments: DayOffRequest['attachments']
}) => (
  <>
    {!!attachments?.length && (
      <Box flexDirection="row" flexWrap="wrap">
        {attachments.map((attachment) => (
          <Box key={attachment.id} paddingRight="s">
            <AttachmentWrapper uri={attachment.uri} fileName={attachment.name} />
          </Box>
        ))}
      </Box>
    )}
  </>
)
