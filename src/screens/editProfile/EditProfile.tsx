import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { mkUseStyles, useTheme } from 'utils/theme'
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
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'
import { SaveChangesButton } from './components/SaveChangesButton'
import { backgroundColor } from '@shopify/restyle'

type EditDetailsTypes = Pick<User, 'lastName' | 'firstName' | 'occupation' | 'photo' | 'userColor'>

export const EditProfile = () => {
  const { showModal, hideModal } = useModalContext()
  const navigation = useNavigation()
  const { user } = useUserContext()
  const styles = useStyles()
  const theme = useTheme()
  const { errors, control, handleSubmit } = useForm({
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
      },
    })
  }

  const handleGoBack = useCallback(() => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  return (
    <SafeAreaWrapper>
      <ScrollView
        style={{
          marginBottom: isEdited ? 93 : 0,
          backgroundColor: styles.container.backgroundColor,
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
        <ProfileDetails {...user} errors={errors} control={control} setIsEdited={setEditedTrue} />
        <TeamSubscriptions />
        <ProfileColor control={control} name="userColor" setIsEdited={setEditedTrue} />
      </ScrollView>
      {isLoading && <LoadingModal show />}
      {isEdited && <SaveChangesButton handleEditDetailsSubmit={handleSubmit(onSubmit)} />}
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.dashboardBackground,
  },
}))
