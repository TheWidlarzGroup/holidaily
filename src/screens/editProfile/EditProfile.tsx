import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { mkUseStyles, Theme, BaseOpacity } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
import { useModalContext } from 'contexts/ModalProvider'
import IconBack from 'assets/icons/icon-back2.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from 'mock-api/models/mirageTypes'
import { keys } from 'utils/manipulation'
import { useEditUser } from 'dataAccess/mutations/useEditUser'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'
import { SaveChangesButton } from './components/SaveChangesButton'

type EditDetailsTypes = Pick<User, 'firstName' | 'lastName' | 'occupation'>

export const EditProfile = () => {
  const { showModal, hideModal } = useModalContext()
  const navigation = useNavigation()
  const { user } = useUserContext()
  const styles = useStyles()
  const { errors, control, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      occupation: user?.occupation,
    },
  })
  const { t } = useTranslation('userProfile')
  const { mutate } = useEditUser()
  const { updateUser } = useUserContext()
  const [isEdited, { setTrue: setEditedTrue, setFalse: setEditedFalse }] = useBooleanState(false)

  const onSubmit = (data: EditDetailsTypes) => {
    mutate(data, {
      onSuccess: ({ user }) => {
        keys(user).forEach(async (field) => {
          await AsyncStorage.setItem(field, String(user[field]))
        })
        updateUser(user)
      },
    })

    showModal(<ChangesSavedModal isVisible content={t('changesSaved')} hideModal={hideModal} />)
    setEditedFalse()
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
        <ProfileColor />
      </ScrollView>
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
