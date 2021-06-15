import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text, mkUseStyles, Theme } from 'utils/theme'
import ProfileImgPlaceholder from 'assets/icons/icon-profile-placeholder.svg'

export const ProfilePicture: FC = () => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const userProfilePicture = false // TODO check for user profile picutre

  const onChangeProfilePicture = () => {
    console.log('change user profile picture')
    // TODO display modal to change user profile picture
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
