import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text, mkUseStyles, Theme } from 'utils/theme'
import ProfileImgPlaceholder from 'assets/icons/icon-profile-placeholder.svg'

type ProfilePictureProps = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  showModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfilePicture = ({ setIsEdited, showModal }: ProfilePictureProps) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const userProfilePicture = false // TODO check for user profile picutre

  const onChangeProfilePicture = () => {
    setIsEdited(true)
    if (userProfilePicture) {
      console.log('change user profile picture')
      // TODO handle editing profile picture
      return
    }
    console.log('add profile picture')
    showModal(true)
  }

  return (
    <Box paddingHorizontal="m" justifyContent="center" alignItems="center" marginTop="xxxl">
      <BaseOpacity onPress={onChangeProfilePicture}>
        <ProfileImgPlaceholder style={styles.profileImg} />
      </BaseOpacity>
      <BaseOpacity onPress={onChangeProfilePicture}>
        <Text variant="boldOrange15" textAlign="center" marginBottom="xl">
          {userProfilePicture ? t('editPhoto') : t('addPhoto')}
        </Text>
      </BaseOpacity>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  profileImg: {
    height: 112,
    width: 112,
    marginBottom: theme.spacing.m,
  },
}))
