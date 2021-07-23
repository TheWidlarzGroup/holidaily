import React from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { TextInput } from 'react-native-gesture-handler'
import { Gallery } from 'components/Gallery/Gallery'
import { GalleryItemData } from 'types/holidaysDataTypes'

import { LocationInfo } from 'components/LocationInfo'
import { CompoundLocation } from 'hooks/useLocation'

type PostBodyProps = {
  text: string
  location: Maybe<CompoundLocation>
  onTextChange: F1<string>
  data: GalleryItemData[]
}

export const PostBody = (props: PostBodyProps) => {
  const { user } = useUserContext()
  const { t } = useTranslation('createPost')

  const styles = useStyles()

  return (
    <Box flexGrow={1} padding="s">
      <Box flexDirection="row">
        <Avatar src={user.photo} size="s" padding="l" />
        <Box marginLeft="m" alignItems="flex-start" flexShrink={1} flexGrow={1}>
          {props.location?.addresses && <LocationInfo location={props.location} />}
          <TextInput
            multiline
            underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder={t('inputPlaceholder')}
            onChangeText={props.onTextChange}
            value={props.text}
          />
        </Box>
      </Box>
      <Gallery data={props.data} />
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  textInput: {
    flexGrow: 1,
    paddingBottom: theme.spacing.l,
    borderColor: theme.colors.transparent,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fontFamily.nunitoRegular,
  },
}))
