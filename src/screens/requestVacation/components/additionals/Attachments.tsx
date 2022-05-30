import React from 'react'
import { AttachmentType } from 'types/holidaysDataTypes'
import { BaseOpacity, Box, mkUseStyles, Text, theme } from 'utils/theme'
import Cross from 'assets/icons/circle-cross.svg'
import { Photo } from 'components/RequestDetails/Photo'
import { AddMore } from './AddMore'

type AttachmentProps = {
  attachments: (AttachmentType | (AttachmentType & { name: string }))[]
  removeAttachment: F1<string>
  addMore?: F0
  displayAddMore?: boolean
  imgHalfScreenWidth?: true
}

export const Attachments = ({
  attachments,
  addMore,
  displayAddMore,
  removeAttachment,
  imgHalfScreenWidth,
}: AttachmentProps) => {
  const styles = useStyles()

  return (
    <Box alignSelf="stretch" style={styles.container}>
      <Box flexDirection="row" flexWrap="wrap">
        {attachments.map((attachment) => (
          <Box key={attachment.id} width={imgHalfScreenWidth ? '50%' : '33.33%'} padding="s">
            {'name' in attachment ? (
              <Box alignItems="center" justifyContent="center">
                <BaseOpacity
                  alignSelf="flex-end"
                  onPress={() => removeAttachment(attachment.id)}
                  hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
                  <Cross width={24} height={24} color={theme.colors.deleteButton} />
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
    marginTop: 20,
  },
}))
