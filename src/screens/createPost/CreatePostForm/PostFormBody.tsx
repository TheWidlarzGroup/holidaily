import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { TextInput } from 'react-native-gesture-handler'
import { AttachmentType } from 'types/holidaysDataTypes'
import { LocationInfo } from 'components/LocationInfo'
import { CompoundLocation } from 'hooks/useLocation'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { makeUserDetails } from 'utils/userDetails'
import { Attachments } from 'screens/requestVacation/components/additionals/Attachments'

type PostBodyProps = {
  text: string
  location: Maybe<CompoundLocation>
  onTextChange: F1<string>
  data: AttachmentType[]
  removeAttachment: F1<string>
}

export const PostBody = (props: PostBodyProps) => {
  const { location, onTextChange, text, data } = props
  const { user } = useUserContext()
  const { t } = useTranslation('createPost')
  const styles = useStyles()

  return (
    <Box flexGrow={1} padding="s">
      <Box flexDirection="row" marginTop="-m">
        <Avatar src={user?.photo} userDetails={makeUserDetails(user)} size="s" padding="l" />
        <Box marginLeft="s" marginTop="s" alignItems="flex-start" flexShrink={1} flexGrow={1}>
          <TextInput
            multiline
            placeholderTextColor={styles.placeholder.color}
            underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder={t('inputPlaceholder')}
            onChangeText={onTextChange}
            value={text}
          />
        </Box>
      </Box>
      <Box paddingHorizontal="s" marginTop="-s" marginBottom="-xm">
        {location?.addresses && <LocationInfo location={location} />}
      </Box>
      <Attachments removeAttachment={props.removeAttachment} attachments={data} />
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
