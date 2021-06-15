import React from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text, mkUseStyles, Theme } from 'utils/theme'
import ProfileImgPlaceholder from 'assets/icons/icon-profile-placeholder.svg'

type ProfilePictureProps = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  showModal: React.Dispatch<React.SetStateAction<boolean>>
  photoURI: ImageSourcePropType | undefined
}

export const ProfilePicture = ({ setIsEdited, showModal, photoURI }: ProfilePictureProps) => {
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
        {photoURI ? (
          <Image source={photoURI} style={styles.profileImg} />
        ) : (
          <ProfileImgPlaceholder style={styles.profileImg} />
        )}
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
