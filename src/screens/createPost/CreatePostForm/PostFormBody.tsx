import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { TextInput } from 'react-native-gesture-handler'
import { LocationInfo } from 'components/LocationInfo'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { makeUserDetails } from 'utils/userDetails'
import { Attachments } from 'screens/requestVacation/components/additionals/Attachments'
import { isIos } from 'utils/layout'
import { useCreatePostContext } from 'hooks/context-hooks/useCreatePostContext'

type PostBodyProps = {
  removeAttachment: F1<string>
}

export const PostFormBody = (props: PostBodyProps) => {
  const { user } = useUserContext()
  const { t } = useTranslation('createPost')
  const styles = useStyles()
  const { postData, updatePostData } = useCreatePostContext()

  return (
    <Box flexGrow={1} padding="s">
      <Box flexDirection="row" marginTop="-m">
        <Avatar src={user?.photo} userDetails={makeUserDetails(user)} size="s" padding="l" />
        <Box
          marginLeft="s"
          marginTop={isIos ? 's' : 'none'}
          alignItems="flex-start"
          flexShrink={1}
          flexGrow={1}>
          <TextInput
            multiline
            placeholderTextColor={styles.placeholder.color}
            underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder={t('inputPlaceholder')}
            onChangeText={(text) => updatePostData({ text })}
            value={postData?.text}
          />
        </Box>
      </Box>
      <Box paddingHorizontal="s" marginTop="-s" marginBottom="-xm">
        {postData?.location && <LocationInfo location={postData?.location} />}
      </Box>
      <Box marginHorizontal="xm">
        <Attachments
          removeAttachment={props.removeAttachment}
          attachments={postData?.data || []}
          imagesPerScreenWidth={2}
          disableDeleteImgOnPress
        />
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  placeholder: {
    color: theme.colors.headerGrey,
  },
  textInput: {
    flexGrow: 1,
    paddingBottom: theme.spacing.l,
    borderColor: theme.colors.transparent,
    width: '100%',
    fontSize: theme.fontSize.sm,
    fontFamily: theme.fontFamily.nunitoRegular,
    color: theme.colors.black,
  },
}))
