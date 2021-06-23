import React from 'react'
import { Box, BaseOpacity, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import IconGallery from 'assets/icons/icon-gallery.svg'
import { useTranslation } from 'react-i18next'

export const FeedHeader = () => {
  const { t } = useTranslation('feed')

  return (
    <Box flexDirection="row" alignItems="center" padding="m" bg="white" borderRadius="l">
      <Box marginRight="m">
        <Avatar size="s" />
      </Box>
      <BaseOpacity flexGrow={1}>
        <Text>{t('createPostLabel')}</Text>
      </BaseOpacity>
      <BaseOpacity padding="s">
        <IconGallery />
      </BaseOpacity>
    </Box>
  )
}
