import React, { useEffect } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useTeamsContext } from 'hooks/context-hooks/useTeamsContext'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { User } from 'mock-api/models/mirageTypes'
import { EditUserSuccess, useEditUser } from 'dataAccess/mutations/useEditUser'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { LoadingModal } from 'components/LoadingModal'
import { useModalContext } from 'contexts/ModalProvider'
import { Box, useTheme } from 'utils/theme'
import { useKeyboard } from 'hooks/useKeyboard'
import { useGetNotificationsConfig } from 'utils/notifications/notificationsConfig'
import { GestureRecognizer } from 'utils/GestureRecognizer'
import { ActionModal } from 'components/ActionModal'
import { useBackHandler } from 'hooks/useBackHandler'
import { ScrollView } from 'react-native-gesture-handler'
import { isIos } from 'utils/layout'
import { useAsyncEffect } from 'hooks/useAsyncEffect'
import { sleep } from 'utils/sleep'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserSettingsContext } from 'hooks/context-hooks/useUserSettingsContext'
import { useGetActiveRouteName } from 'utils/useGetActiveRouteName'
import { StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'

type EditDetailsTypes = Pick<User, 'lastName' | 'firstName' | 'occupation' | 'photo' | 'userColor'>

export const EditProfile = () => {
  const [displayLoadingModal, { setTrue: showLoadingModal, setFalse: hideLoadingModal }] =
    useBooleanState(true)
  const [animationTriggered, { setTrue: animationIsTriggered, setFalse: animationNotTriggered }] =
    useBooleanState(false)
  const navigation = useNavigation()
  const theme = useTheme()
  const { keyboardOpen, keyboardHeight } = useKeyboard()
  const { userSettings } = useUserSettingsContext()
  const activeRouteName = useGetActiveRouteName()
  const { user } = useUserContext()
  const { notify } = useGetNotificationsConfig()
  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    photo: user?.photo,
  }
  const {
    errors,
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues,
  })
  const [displaySaveModal, { setTrue: showSaveModal, setFalse: hideSaveModal }] =
    useBooleanState(false)
  const onDiscard = () => {
    hideSaveModal()
    reset(defaultValues)
  }
  const { t } = useTranslation('userProfile')
  const safeAreaInsets = useSafeAreaInsets()
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

  useEffect(
    () => (isDirty ? showSaveModal() : hideSaveModal()),
    [isDirty, showSaveModal, hideSaveModal]
  )

  useAsyncEffect(async () => {
    await sleep(300)
    hideLoadingModal()
  }, [])

  useEffect(() => {
    if (isLoading) showLoadingModal()
    else hideLoadingModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => {
    if (activeRouteName === 'EDIT_PROFILE')
      StatusBar.setBarStyle(userSettings?.darkMode ? 'light-content' : 'dark-content')
    if (activeRouteName === 'COLOR_PICKER') StatusBar.setBarStyle('light-content')
  }, [activeRouteName, userSettings?.darkMode])

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

        notify('successCustom', { params: { title: t('changesSaved') } })
      },
    })
  const onSubmit = (data: EditDetailsTypes) => {
    hideSaveModal()
    editUser(data)
  }
  const onGoBack = () => {
    navigation.goBack()
    if (activeRouteName === 'EDIT_PROFILE') navigation.dispatch(DrawerActions.openDrawer())
  }
  const onUnsavedChanges = useWithConfirmation({
    onAccept: () => {
      handleSubmit(onSubmit)
      onGoBack()
    },
    onDecline: () => {
      onDiscard()
      onGoBack()
    },
    onDismiss: hideModal,
    header: t('confirmSave'),
    content: t('changesWillBeLost'),
    acceptBtnText: t('saveChanges'),
    declineBtnText: t('discardChanges'),
  })
  const onDeletePicture = () => editUser({ photo: null })

  const getBottomOffset = () => {
    if (keyboardOpen && isDirty) return keyboardHeight
    if (keyboardOpen && !isDirty) return keyboardHeight
    if (!keyboardOpen && isDirty) return 170
    return 0
  }

  const handleGoBack = isDirty ? onUnsavedChanges : onGoBack

  useBackHandler(() => {
    handleGoBack()
    return true
  })

  return (
    <SafeAreaWrapper edges={animationTriggered ? ['left', 'right'] : ['top']}>
      <GestureRecognizer onSwipeRight={handleGoBack}>
        <ScrollView
          style={{ flex: 1, paddingTop: animationTriggered ? safeAreaInsets.top + 10 : 0 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <DrawerBackArrow
            goBack={handleGoBack}
            arrowColor={animationTriggered ? theme.colors.transparent : undefined}
          />
          <ProfilePicture onDelete={onDeletePicture} control={control} name="photo" />
          <ProfileDetails {...user} errors={errors} control={control} hasValueChanged={isDirty} />
          <TeamSubscriptions />
          <ProfileColor
            onUpdate={onUpdate}
            animationStatus={{ animationIsTriggered, animationNotTriggered }}
          />
          <Box height={getBottomOffset()} />
        </ScrollView>
        <ActionModal
          isVisible={displaySaveModal}
          onUserAction={handleSubmit(onSubmit)}
          label={t('saveChanges')}
          extraButtons={[{ onPress: onDiscard, label: t('discardChanges'), variant: 'secondary' }]}
          extraStyle={{ paddingBottom: isIos ? 45 : 20 }}
        />
      </GestureRecognizer>
      <LoadingModal show={displayLoadingModal} style={{ backgroundColor: theme.colors.white }} />
    </SafeAreaWrapper>
  )
}
