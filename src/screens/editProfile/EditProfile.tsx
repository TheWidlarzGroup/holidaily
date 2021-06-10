import React, { FC, useState } from 'react'
import { Image, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BaseOpacity, Box, Text, theme } from 'utils/theme'
import { minTwoWordsRegex, minOneSignRegex, passwordRegex } from 'utils/regex'
import { FormInput } from 'components/FormInput'
import IconAdd from 'assets/icons/icon-add.svg'

import ProfileImgPlaceholder from 'assets/User_Picture_Placeholder.png'

export const EditProfile: FC = () => {
  const { control, errors } = useForm()
  const { t } = useTranslation('userProfile')

  const [userTeams, setUserTeams] = useState<string[]>(['Smartsoft', 'Akademia'])
  const userProfilePicture = false // TODO check for user profile picutre

  const onSubmitEditing = () => {
    console.log('submit editing')
    // TODO submit editing input
  }
  const onChangeProfilePicture = () => {
    console.log('change user profile picture')
    // TODO display modal to change user profile picture
  }
  const onChangeUserColor = () => {
    console.log('change user color')
    // TODO display modal to change user color
  }
  const onAddSubscribedTeam = () => {
    console.log('add subscribed team')
    // TODO display modal to add new subscriptions
  }
  const onRemoveSubscribedTeam = (team: string) => {
    // TODO display modal to confirm changes
    setUserTeams(userTeams.filter((item: string) => item !== team))
  }

  return (
    <ScrollView style={styles.mainView}>
      <Box paddingHorizontal="m" justifyContent="center" alignItems="center" marginTop="xxxl">
        <Pressable onPress={onChangeProfilePicture}>
          <Image source={ProfileImgPlaceholder} style={styles.profileImg} />
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
            validationPattern={minTwoWordsRegex}
            errorMessage={t('editDetailsErrMsg')}
            keyboardType="default"
            autoCompleteType="off"
            onSubmitEditing={onSubmitEditing}
            isEditIconVisible
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.role}
            errors={errors}
            name="role"
            inputLabel={t('userRole')}
            validationPattern={minOneSignRegex}
            errorMessage={t('editDetailsErrMsg')}
            keyboardType="default"
            autoCompleteType="off"
            onSubmitEditing={onSubmitEditing}
            isEditIconVisible
          />
        </Box>
        <Box>
          <FormInput
            control={control}
            isError={!!errors.password}
            errors={errors}
            name="password"
            inputLabel={t('userPassword')}
            validationPattern={passwordRegex}
            errorMessage={t('editDetailsErrMsg')}
            onSubmitEditing={onSubmitEditing}
            isEditIconVisible
          />
        </Box>
      </Box>
      <Box paddingHorizontal="m" marginBottom="l">
        <Text variant="label1" marginLeft="m" marginBottom="xm">
          {t('userSubscriptions')}
        </Text>
        <Box flexDirection="row" position="relative">
          <BaseOpacity
            onPress={onAddSubscribedTeam}
            justifyContent="center"
            alignItems="center"
            position="absolute"
            right={0}
            top={0}
            height={44}
            width={44}
            borderRadius={44 / 2}
            backgroundColor="lightGrey">
            <IconAdd />
          </BaseOpacity>
          {userTeams.map((team, idx) => (
            <TouchableOpacity onPress={() => onRemoveSubscribedTeam(team)} key={idx}>
              <Text style={styles.teamsListItem} variant="resendWhite">
                {team}
              </Text>
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
      <Box paddingHorizontal="m" marginBottom="xl">
        <Text variant="label1" marginLeft="m">
          {t('userColor')}
        </Text>
        <Pressable onPress={onChangeUserColor} style={styles.userColor}></Pressable>
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
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
    backgroundColor: theme.colors.lightGrey,
  },
})
