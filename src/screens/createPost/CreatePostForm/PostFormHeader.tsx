import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'
import IconClose from 'assets/icons/icon-close.svg'

type PostHeaderProps = {
  closeCreatePostForm: F0
  left?: ReactNode
  right?: ReactNode
}

const ICON_SIZE = 16

export const PostHeader = ({ closeCreatePostForm, left, right }: PostHeaderProps) => {
  const { t } = useTranslation('createPost')
  const theme = useTheme()

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      padding="l"
      backgroundColor="transparent">
      <Box position="absolute" right={0} top={-15}>
        {left ?? (
          <BaseOpacity padding="m" onPress={closeCreatePostForm}>
            <IconClose color={theme.colors.black} height={ICON_SIZE} width={ICON_SIZE} />
          </BaseOpacity>
        )}
      </Box>
      <Text variant="displayBoldSM" textAlign="center" paddingTop="m">
        {t('title')}
      </Text>
      <Box position="absolute" right={0}>
        {right}
      </Box>
    </Box>
  )
}
