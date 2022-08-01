import React from 'react'
import { Box, Text } from 'utils/theme/index'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

type MessageProps = {
  onPress: F0
  content: string
  maxLen: number
}

export const Message = (p: MessageProps) => {
  const { t } = useTranslation('requestVacation')
  return (
    <TouchableOpacity onPress={p.onPress}>
      <Box padding="m" backgroundColor="lightGrey" borderRadius="l1min" marginTop="xs">
        <Text variant="textMD" color="black">
          {p.content}
        </Text>
      </Box>
      <Box alignSelf="flex-end" marginRight="xs">
        <Text variant="textXS" color="darkGrey">
          {t('messageCharactes', { count: p.content.length, max: p.maxLen })}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
