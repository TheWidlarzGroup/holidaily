import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { BaseOpacity, Box, Text, mkUseStyles, Theme } from 'utils/theme'
import ProfileImgPlaceholder from 'assets/icons/icon-profile-placeholder.svg'

type ProfilePictureProps = {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
  showModal: React.Dispatch<React.SetStateAction<boolean>>
  photoURI: string | undefined
}

export const ProfilePicture = ({ setIsEdited, showModal, photoURI }: ProfilePictureProps) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const { user } = useUserContext()
  const { photo: userPhoto } = user
  const [userProfilePicture, setUserProfilePicture] = useState<string | undefined>('')

  const onChangeProfilePicture = () => {
    setIsEdited(true)
    showModal(true)
  }

  useEffect(() => {
    if (photoURI) {
      setUserProfilePicture(photoURI)
    } else {
      setUserProfilePicture(userPhoto)
    }
  }, [userPhoto, photoURI])

  return (
    <Box paddingHorizontal="m" justifyContent="center" alignItems="center" marginTop="xxxl">
      <BaseOpacity onPress={onChangeProfilePicture}>
        {userProfilePicture ? (
          <Image source={{ uri: userProfilePicture }} style={styles.profileImg} />
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
    borderRadius: 112 / 2,
  },
}))
