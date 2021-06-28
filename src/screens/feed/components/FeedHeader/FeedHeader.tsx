import React from 'react'
import { Box, BaseOpacity, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import IconGallery from 'assets/icons/icon-gallery.svg'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

export const FeedHeader = () => {
  const { navigate } = useNavigation()
  const { t } = useTranslation('feed')

  return (
    <Box flexDirection="row" alignItems="center" padding="m" bg="white" borderRadius="l">
      <Box marginRight="m">
        <Avatar size="s" />
      </Box>
      <BaseOpacity flexGrow={1} onPress={() => navigate('CreatePost')}>
        <Text>{t('createPostLabel')}</Text>
      </BaseOpacity>
      <BaseOpacity padding="s" onPress={() => navigate('CreatePost')}>
        <IconGallery />
      </BaseOpacity>
    </Box>
  )
}
