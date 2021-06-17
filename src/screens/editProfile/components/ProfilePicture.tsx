import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { Box, Text, mkUseStyles, Theme, theme } from 'utils/theme'
import ProfileImgPlaceholder from 'assets/icons/icon-profile-placeholder.svg'

type ProfilePictureProps = {
  setIsEdited: F0
  showUploadModal: F0
  showEditModal: F0
  photoURI: string | undefined | null
}

export const ProfilePicture = ({
  setIsEdited,
  showUploadModal,
  showEditModal,
  photoURI,
}: ProfilePictureProps) => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const { user } = useUserContext()
  const { photo: userPhoto } = user
  const [userProfilePicture, setUserProfilePicture] = useState<string | undefined | null>('')

  const onChangeProfilePicture = () => {
    console.log('change picture')
    setIsEdited()
    showEditModal()
  }

  const onAddProfilePicture = () => {
    console.log('add picture')
    setIsEdited()
    showUploadModal()
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
      <RectButton
        onPress={userProfilePicture ? onChangeProfilePicture : onAddProfilePicture}
        activeOpacity={0.2}
        rippleColor={theme.colors.rippleColor}>
        {userProfilePicture ? (
          <Image source={{ uri: userProfilePicture }} style={styles.profileImg} />
        ) : (
          <ProfileImgPlaceholder style={styles.profileImg} />
        )}
      </RectButton>
      <RectButton
        onPress={userProfilePicture ? onChangeProfilePicture : onAddProfilePicture}
        activeOpacity={0.2}
        rippleColor={theme.colors.rippleColor}>
        <Text variant="boldOrange15" textAlign="center" marginBottom="xl">
          {userProfilePicture ? t('editPhoto') : t('addPhoto')}
        </Text>
      </RectButton>
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
