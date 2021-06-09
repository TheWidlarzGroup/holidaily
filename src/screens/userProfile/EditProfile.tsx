import React, { FC, useState } from 'react'
import { Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormInput } from 'components/FormInput'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Text, Box, theme } from 'utils/theme'
import IconPlus from 'assets/icons/icon-plus.svg'

export const EditProfile: FC = () => {
  const ProfileImgPlaceholder = require('assets/User_Picture_Placeholder.png')
  const userProfilePicture = require('assets/User_Picture_Placeholder.png')
  const { control, handleSubmit, errors } = useForm()
  const { t } = useTranslation('userProfile')

  const [userTeams, setUserTeams] = useState<string[]>(['Smartsoft', 'Akademia'])

  const onSubmitEditing = () => {}
  const onChangeProfilePicture = () => {}
  const onChangeUserColor = () => {}
  const onAddSubscribedTeam = () => {}
  const onRemoveSubscribedTeam = (team: string) => {
    setUserTeams(userTeams.filter((item: string) => item !== team))
  }

  return (
    <SafeAreaWrapper>
      <Box style={styles.imgBox}>
        <Pressable onPress={onChangeProfilePicture}>
          <Image source={userProfilePicture || ProfileImgPlaceholder} style={styles.profileImg} />
        </Pressable>
        <Pressable onPress={onChangeProfilePicture}>
          <Text variant="boldOrange15" textAlign="center" marginBottom="xl">
            {userProfilePicture ? t('editPhoto') : t('addPhoto')}
          </Text>
        </Pressable>
      </Box>
      <Box paddingHorizontal="m">
        <Box>
          <FormInput
            control={control}
            isError={!!errors.nameSurname}
            errors={errors}
            name="nameSurname"
            inputLabel={t('userNameSurname')}
            validationPattern={/^/}
            errorMessage="Something went wrong, please try again."
            keyboardType="default"
            autoCompleteType="off"
            onSubmitEditing={onSubmitEditing}
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.role}
            errors={errors}
            name="role"
            inputLabel={t('userRole')}
            validationPattern={/^/}
            errorMessage="Something went wrong, please try again."
            keyboardType="default"
            autoCompleteType="off"
            onSubmitEditing={onSubmitEditing}
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.password}
            errors={errors}
            name="password"
            inputLabel={t('userPassword')}
            validationPattern={/^/}
            errorMessage="Something went wrong, please try again."
            keyboardType="default"
            autoCompleteType="off"
            onSubmitEditing={onSubmitEditing}
          />
        </Box>
      </Box>
      <Box paddingHorizontal="m" marginBottom="l">
        <Text variant="label1" marginLeft="m" marginBottom="xm">
          {t('userSubscriptions')}
        </Text>
        <Box flexDirection="row" position="relative">
          <Pressable onPress={onAddSubscribedTeam} style={styles.addTeamsBtn}>
            <IconPlus />
          </Pressable>
          {userTeams.map((team, idx) => (
            <TouchableOpacity onPress={() => onRemoveSubscribedTeam(team)} key={idx}>
              <Text style={styles.teamsListItem} variant="resendWhite">
                {team}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
      <Box paddingHorizontal="m">
        <Text variant="label1" marginLeft="m">
          {t('userColor')}
        </Text>
        <Pressable onPress={onChangeUserColor} style={styles.userColor}></Pressable>
      </Box>
    </SafeAreaWrapper>
  )
}

const styles = StyleSheet.create({
  imgBox: {
    paddingHorizontal: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xxxl,
  },
  profileImg: {
    height: 112,
    width: 112,
    marginBottom: theme.spacing.m,
  },
  teamsListItem: {
    backgroundColor: 'black',
    borderRadius: 100,
    marginRight: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  userColor: {
    marginTop: theme.spacing.xm,
    marginLeft: theme.spacing.m,
    height: 44,
    width: 44,
    backgroundColor: 'red',
    borderRadius: 44 / 2,
  },
  addTeamsBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    height: 44,
    width: 44,
    borderRadius: 44 / 2,
    backgroundColor: theme.colors.disabledText,
  },
})
