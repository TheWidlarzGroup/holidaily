import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Box, useTheme } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { useTeamsContext } from 'hooks/useTeamsContext'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { User } from 'mock-api/models/mirageTypes'
import { EditUserSuccess, useEditUser } from 'dataAccess/mutations/useEditUser'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { LoadingModal } from 'components/LoadingModal'
import { useBooleanState } from 'hooks/useBooleanState'
import { Toast } from 'components/Toast'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'
import { SaveChangesButton } from './components/SaveChangesButton'

type EditDetailsTypes = Pick<User, 'lastName' | 'firstName' | 'occupation' | 'photo' | 'userColor'>

export const EditProfile = () => {
  const navigation = useNavigation()
  const { user } = useUserContext()
  const theme = useTheme()
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
      userColor: user?.userColor || theme.colors.primary,
      photo: user?.photo,
    },
  })
  const [isToastVisible, { setTrue: showSuccessToast, setFalse: hideSuccessToast }] =
    useBooleanState(false)
  const { t } = useTranslation('userProfile')
  const { mutate: mutateUser, isLoading } = useEditUser()
  const { addUserToTeams } = useTeamsContext()
  const onUpdate = useCallback(
    (payload: EditUserSuccess) => {
      if (user) {
        addUserToTeams(
          payload.user,
          user.teams.map((t) => t.name),
          { withReset: true }
        )
      }
    },
    [user, addUserToTeams]
  )
  const editUser = (data: Partial<User>) =>
    mutateUser(data, {
      onSuccess: (payload) => {
        onUpdate(payload)
        showSuccessToast()
        reset({
          firstName: payload.user?.firstName,
          lastName: payload.user?.lastName,
          occupation: payload.user?.occupation,
          userColor: payload.user?.userColor,
          photo: payload.user?.photo,
        })
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
  return (
    <>
      <SafeAreaWrapper>
        <Box>
          <ScrollView style={formOffset}>
            <GestureRecognizer onSwipeRight={handleGoBack} style={[StyleSheet.absoluteFill]} />
            <DrawerBackArrow goBack={handleGoBack} />
            <ProfilePicture onDelete={onDeletePicture} control={control} name="photo" />
            <ProfileDetails {...user} errors={errors} control={control} hasValueChanged={isDirty} />
            <TeamSubscriptions showSuccessToast={showSuccessToast} />
            <ProfileColor control={control} name="userColor" />
          </ScrollView>
          {isToastVisible && (
            <Toast onHide={hideSuccessToast} variant="success" text={t('changesSaved')} />
          )}
          {isLoading && <LoadingModal show />}
          {!isLoading && isDirty && (
            <SaveChangesButton onDiscard={reset} handleEditDetailsSubmit={handleSubmit(onSubmit)} />
          )}
        </Box>
      </SafeAreaWrapper>
    </>
  )
}
