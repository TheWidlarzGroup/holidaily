import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'

import IconClose from 'assets/icons/icon-close.svg'
import { useNavigation } from '@react-navigation/native'

type PostHeaderProps = {
  left?: React.ReactNode
  right?: React.ReactNode
}

export const PostHeader = ({ left, right }: PostHeaderProps) => {
  const { t } = useTranslation('createPost')
  const { goBack } = useNavigation()
  const theme = useTheme()
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      padding="l"
      backgroundColor="transparent">
      <Box position="absolute" left={0}>
        {left ?? (
          <BaseOpacity padding="m" onPress={() => goBack()}>
            <IconClose color={theme.colors.black} />
          </BaseOpacity>
        )}
      </Box>
      <Text variant="boldBlack16" textAlign="center">
        {t('title')}
      </Text>
      <Box position="absolute" right={0}>
        {right}
      </Box>
    </Box>
  )
}
