import React from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { TextInput } from 'react-native-gesture-handler'
import { Gallery } from 'components/Gallery/Gallery'
import { themeBase } from 'utils/theme/themeBase'
import { GalleryItemData } from 'types/holidaysDataTypes'

type PostBodyProps = {
  text: string
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
        <TextInput
          multiline
          underlineColorAndroid={themeBase.colors.transparent}
          style={styles.textInput}
          placeholder={t('inputPlaceholder')}
          onChangeText={props.onTextChange}
          value={props.text}
        />
      </Box>
      <Gallery data={props.data} />
    </Box>
  )
}

const useStyles = mkUseStyles(() => ({
  textInput: {
    flexGrow: 1,
    padding: themeBase.spacing.m,
    paddingBottom: themeBase.spacing.l,
    borderColor: themeBase.colors.transparent,
  },
}))
