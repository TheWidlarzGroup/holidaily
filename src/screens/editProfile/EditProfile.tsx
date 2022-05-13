import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useTheme } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
import { useModalContext } from 'contexts/ModalProvider'
import { User } from 'mock-api/models/mirageTypes'
import { EditUserSuccess, useEditUser } from 'dataAccess/mutations/useEditUser'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import GestureRecognizer from 'react-native-swipe-gestures'
import { LoadingModal } from 'components/LoadingModal'
import { useTeamsContext } from 'hooks/useTeamsContext'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'
import { SaveChangesButton } from './components/SaveChangesButton'

type EditDetailsTypes = Pick<User, 'lastName' | 'firstName' | 'occupation' | 'photo' | 'userColor'>

export const EditProfile = () => {
  const { showModal, hideModal } = useModalContext()
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
    },
  })

  const { t } = useTranslation('userProfile')
  const { mutate, isLoading } = useEditUser()
  const { addUserToTeams } = useTeamsContext()
  const [isEdited, { setTrue: setEditedTrue, setFalse: setEditedFalse }] = useBooleanState(false)
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
  const onSubmit = (data: EditDetailsTypes) => {
    setEditedFalse()
    mutate(data, {
      onSuccess: (payload) => {
        onUpdate(payload)
        showModal(<ChangesSavedModal isVisible content={t('changesSaved')} hideModal={hideModal} />)
        reset({
          firstName: payload.user?.firstName,
          lastName: payload.user?.lastName,
          occupation: payload.user?.occupation,
          userColor: payload.user?.userColor,
        })
      },
    })
  }
  const onGoBack = () => {
    setEditedFalse()
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

  const handleGoBack = isEdited ? onUnsavedChanges : onGoBack

  return (
    <SafeAreaWrapper>
      <ScrollView
        style={{
          marginBottom: isEdited ? 93 : 0,
        }}>
        <GestureRecognizer
          onSwipeRight={handleGoBack}
          style={{ position: 'absolute', height: '100%', width: '100%' }}
        />
        <DrawerBackArrow goBack={handleGoBack} />
        <ProfilePicture
          onUpdate={onUpdate}
          setIsEditedTrue={setEditedTrue}
          setIsEditedFalse={setEditedFalse}
        />
        <ProfileDetails
          {...user}
          errors={errors}
          control={control}
          setIsEdited={setEditedTrue}
          hasValueChanged={isDirty}
        />
        <TeamSubscriptions />
        <ProfileColor control={control} name="userColor" setIsEdited={setEditedTrue} />
      </ScrollView>
      {isLoading && <LoadingModal show />}
      {isEdited && (
        <SaveChangesButton
          onDiscard={() => {
            reset()
            setEditedFalse()
          }}
          handleEditDetailsSubmit={handleSubmit(onSubmit)}
        />
      )}
    </SafeAreaWrapper>
  )
}
