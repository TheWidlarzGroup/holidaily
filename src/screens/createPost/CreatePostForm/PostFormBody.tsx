import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { TextInput } from 'react-native-gesture-handler'
import { Gallery } from 'components/Gallery/Gallery'
import { GalleryItemData } from 'types/holidaysDataTypes'

import { LocationInfo } from 'components/LocationInfo'
import { CompoundLocation } from 'hooks/useLocation'
import { useAvatarContext } from 'contexts/AvatarProvider'

type PostBodyProps = {
  text: string
  location: Maybe<CompoundLocation>
  onTextChange: F1<string>
  data: GalleryItemData[]
}

export const PostBody = (props: PostBodyProps) => {
  const { location, onTextChange, text, data } = props
  const { avatarUri } = useAvatarContext()
  const { t } = useTranslation('createPost')

  const styles = useStyles()

  return (
    <Box flexGrow={1} padding="s">
      <Box flexDirection="row">
        <Avatar src={avatarUri} size="s" padding="l" />
        <Box marginLeft="m" alignItems="flex-start" flexShrink={1} flexGrow={1}>
          {location?.addresses && <LocationInfo location={location} />}
          <TextInput
            multiline
            underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder={t('inputPlaceholder')}
            onChangeText={onTextChange}
            value={text}
          />
        </Box>
      </Box>
      <Gallery data={data} />
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  textInput: {
    flexGrow: 1,
    paddingBottom: theme.spacing.l,
    borderColor: theme.colors.transparent,
    width: '100%',
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontFamily.nunitoRegular,
  },
}))
