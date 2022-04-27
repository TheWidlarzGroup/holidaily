import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { mkUseStyles, Theme, BaseOpacity, useTheme } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
import { useModalContext } from 'contexts/ModalProvider'
import IconBack from 'assets/icons/icon-back2.svg'
import { StorageKeys, setItem, removeItem } from 'utils/localStorage'
import { User } from 'mock-api/models/mirageTypes'
import { useEditUser } from 'dataAccess/mutations/useEditUser'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { isIos } from 'utils/layout'
import GestureRecognizer from 'react-native-swipe-gestures'
import { LoadingModal } from 'components/LoadingModal'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'
import { SaveChangesButton } from './components/SaveChangesButton'

type EditDetailsTypes = Pick<User, typeof fieldsToStoreLocally[number]>

const fieldsToStoreLocally: readonly (keyof User & StorageKeys)[] = [
  'firstName',
  'lastName',
  'occupation',
  'photo',
  'userColor',
]

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
  const { updateUser } = useUserContext()
  const [isEdited, { setTrue: setEditedTrue, setFalse: setEditedFalse }] = useBooleanState(false)
  const onSubmit = (data: EditDetailsTypes) => {
    setEditedFalse()
    mutate(data, {
      onSuccess: async ({ user }) => {
        showModal(<ChangesSavedModal isVisible content={t('changesSaved')} hideModal={hideModal} />)
        await Promise.all(
          fieldsToStoreLocally.map((field) =>
            user[field] ? setItem(field, String(user[field])) : removeItem(field)
          )
        )
        // @ts-expect-error user on the backend has teams as an empty array.
        // Teams are a required prop of type User but we still want to delete theme before updating the context
        delete user.teams
        updateUser(user)
      },
    })
  }

  const handleGoBack = useCallback(() => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  return (
    <SafeAreaWrapper edges={['left', 'right', 'bottom']}>
      <GestureRecognizer onSwipeRight={handleGoBack}>
        <ScrollView style={{ marginBottom: isEdited ? 93 : 0, marginTop: isIos ? 20 : 0 }}>
          <BaseOpacity
            onPress={handleGoBack}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={styles.backBtn}
            activeOpacity={0.5}>
            <IconBack height={18} width={18} />
          </BaseOpacity>
          <ProfilePicture setIsEditedTrue={setEditedTrue} setIsEditedFalse={setEditedFalse} />
          <ProfileDetails {...user} errors={errors} control={control} setIsEdited={setEditedTrue} />
          <TeamSubscriptions />
          <ProfileColor control={control} name="userColor" setIsEdited={setEditedTrue} />
        </ScrollView>
        {isLoading && <LoadingModal show />}
        {isEdited && <SaveChangesButton handleEditDetailsSubmit={handleSubmit(onSubmit)} />}
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  shadow: {
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 45,
    left: 16,
  },
}))
