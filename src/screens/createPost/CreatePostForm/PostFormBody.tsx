import React from 'react'
import { useUserContext } from 'hooks/useUserContext'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { TextInput } from 'react-native-gesture-handler'
import { themeBase } from 'utils/theme/themeBase'

type PostBodyProps = {
  text: string
  onTextChange: F1<string>
}

export const PostBody = (props: PostBodyProps) => {
  const { user } = useUserContext()
  const { t } = useTranslation('createPost')

  const styles = useStyles()

  return (
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
  )
}

const useStyles = mkUseStyles(() => ({
  textInput: {
    flexGrow: 1,
  },
}))
