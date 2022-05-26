import React, { useCallback } from 'react'
import { BackHandler, ScrollView, StyleSheet } from 'react-native'
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Box } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { useTeamsContext } from 'hooks/useTeamsContext'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { User } from 'mock-api/models/mirageTypes'
import { EditUserSuccess, useEditUser } from 'dataAccess/mutations/useEditUser'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { LoadingModal } from 'components/LoadingModal'
import { useModalContext } from 'contexts/ModalProvider'
import { notify } from 'react-native-notificated'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'
import { SaveChangesButton } from './components/SaveChangesButton'

type EditDetailsTypes = Pick<User, 'lastName' | 'firstName' | 'occupation' | 'photo' | 'userColor'>

export const EditProfile = () => {
  const navigation = useNavigation()

  const { user } = useUserContext()
  const {
    errors,
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      occupation: user?.occupation,
      photo: user?.photo,
    },
  })

  const { t } = useTranslation('userProfile')
  const { mutate: mutateUser, isLoading } = useEditUser()
  const { addUserToTeams } = useTeamsContext()
  const { hideModal } = useModalContext()
  const onUpdate = (payload: EditUserSuccess) => {
    if (user) {
      addUserToTeams(
        payload.user,
        user.teams.map((t) => t.name),
        { withReset: true }
      )
    }
  }

  const editUser = (data: Partial<User>) =>
    mutateUser(data, {
      onSuccess: (payload) => {
        onUpdate(payload)
        reset({
          firstName: payload.user?.firstName,
          lastName: payload.user?.lastName,
          occupation: payload.user?.occupation,
          photo: payload.user?.photo,
        })

        notify('success', { params: { title: t('changesSaved') } })
      },
    })
  const onSubmit = (data: EditDetailsTypes) => editUser(data)
  const onGoBack = () => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }
  const onUnsavedChanges = useWithConfirmation({
    onAccept: () => {
      handleSubmit(onSubmit)
      onGoBack()
    },
    onDecline: () => {
      reset()
      onGoBack()
    },
    onDismiss: hideModal,
    header: t('confirmSave'),
    content: t('changesWillBeLost'),
    acceptBtnText: t('saveChanges'),
    declineBtnText: t('discard'),
  })
  const onDeletePicture = () => editUser({ photo: null })

  const handleGoBack = isDirty ? onUnsavedChanges : onGoBack
  const formOffset = {
    marginBottom: isDirty ? 93 : 0,
  }
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleGoBack()
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [handleGoBack])
  )

  return (
    <>
      <SafeAreaWrapper>
        <Box>
          <ScrollView style={formOffset} keyboardShouldPersistTaps="handled">
            <GestureRecognizer onSwipeRight={handleGoBack} style={[StyleSheet.absoluteFill]} />
            <DrawerBackArrow goBack={handleGoBack} />
            <ProfilePicture onDelete={onDeletePicture} control={control} name="photo" />
            <ProfileDetails {...user} errors={errors} control={control} hasValueChanged={isDirty} />
            <TeamSubscriptions />
            <ProfileColor onUpdate={onUpdate} />
          </ScrollView>
          {isLoading && <LoadingModal show />}
          {!isLoading && isDirty && (
            <SaveChangesButton onDiscard={reset} handleEditDetailsSubmit={handleSubmit(onSubmit)} />
          )}
        </Box>
      </SafeAreaWrapper>
    </>
  )
}
