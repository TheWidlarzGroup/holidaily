import React from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'
import { BaseOpacity, Box, mkUseStyles, Text } from 'utils/theme'
import Cross from 'assets/icons/circle-cross.svg'
import { Photo } from 'components/RequestDetails/Photo'
import { AddMore } from './AddMore'

type AttachmentProps = {
  attachments: (AttachmentType | (AttachmentType & { name: string }))[]
  removeAttachment: F1<string>
  addMore: F0
  displayAddMore?: boolean
}

export const Attachments = ({
  attachments,
  addMore,
  displayAddMore,
  removeAttachment,
}: AttachmentProps) => {
  const styles = useStyles()
  const isRowFull = attachments.length % 4 === 0
  return (
    <Box alignSelf="stretch" style={styles.container}>
      <Box flexDirection="row" flexWrap="wrap">
        {attachments.map((attachment) => (
          <Box key={attachment.id} paddingRight="s" width="25%">
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
                width={80}
                height={80}
                src={attachment.uri}
                onClose={() => removeAttachment(attachment.id)}
                displayClose
              />
            )}
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

const useStyles = mkUseStyles(() => ({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
}))
