import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
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
        updateUser(user)
      },
    })
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView style={{ marginBottom: isEdited ? 93 : 0 }}>
        <BaseOpacity
          onPress={() => {
            navigation.navigate('Dashboard')
            navigation.dispatch(DrawerActions.openDrawer())
          }}
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
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  mainView: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
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
