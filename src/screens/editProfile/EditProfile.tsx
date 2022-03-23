import React, { useEffect } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { mkUseStyles, Theme, BaseOpacity } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
// import { useUserData } from 'hooks/useUserData'
import { useModalContext } from 'contexts/ModalProvider'
// import { useUpdateUser } from 'hooks/useUpdateUser'
import IconBack from 'assets/icons/icon-back.svg'
import { LoadingModal } from 'components/LoadingModal'
import { UserData } from '../../contexts/UserContext'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'
import { SaveChangesButton } from './components/SaveChangesButton'

type EditDetailsTypes = Pick<UserData, 'firstName' | 'lastName' | 'occupation'>

export const EditProfile = () => {
  const { showModal, hideModal } = useModalContext()
  const { handleUpdateUser, isSuccess, isLoading } = {
    handleUpdateUser: () => {},
    isSuccess: false,
    isLoading: true,
  } // useUpdateUser()
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
  const { fetchUser } = { fetchUser: () => {} } // useUserData()

  const [isEdited, { setTrue: setEditedTrue, setFalse: setEditedFalse }] = useBooleanState(false)

  const handleEditDetailsSubmit = (data: EditDetailsTypes) => {
    // @ts-ignore
    handleUpdateUser(data)
    fetchUser()
  }

  useEffect(() => {
    if (isSuccess) {
      showModal(<ChangesSavedModal isVisible content={t('changesSaved')} hideModal={hideModal} />)
      setEditedFalse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView style={{ marginBottom: isEdited ? 93 : 0 }}>
        <BaseOpacity
          onPress={() => {
            navigation.navigate('Dashboard')
            navigation.dispatch(DrawerActions.openDrawer())
          }}
          style={styles.backBtn}
          activeOpacity={0.5}>
          <IconBack />
        </BaseOpacity>
        <ProfilePicture setIsEditedTrue={setEditedTrue} setIsEditedFalse={setEditedFalse} />
        <ProfileDetails {...user} errors={errors} control={control} setIsEdited={setEditedTrue} />
        <TeamSubscriptions />
        <ProfileColor />
      </ScrollView>
      <LoadingModal show={isLoading} />
      {isEdited && (
        <SaveChangesButton handleEditDetailsSubmit={handleSubmit(handleEditDetailsSubmit)} />
      )}
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
    top: 20,
  },
}))
