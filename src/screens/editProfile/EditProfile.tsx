import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { mkUseStyles, Theme, BaseOpacity } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
import IconBack from 'assets/icons/icon-back.svg'
import { ModalProvider } from '../../contexts/ModalProvider'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'
import { SaveChangesButton } from './components/SaveChangesButton'

export const EditProfile = () => {
  const { navigate } = useNavigation()
  const { user } = useUserContext()
  const { firstName, lastName, role } = user
  const styles = useStyles()
  const { errors, control } = useForm({
    defaultValues: {
      firstName,
      lastName,
      role,
    },
  })
  const { t } = useTranslation('userProfile')

  const [isEdited, { setTrue: setEditedTrue, setFalse: setEditedFalse }] = useBooleanState(false)

  const [
    isChangesSavedModalVisible,
    { setTrue: showChangesSavedModal, setFalse: hideChangesSavedModal },
  ] = useBooleanState(false)

  const handleEditDetailsSubmit = () => {
    showChangesSavedModal()
    setEditedFalse()
    // TODO: function updating user data from const {firstName, lastName, role} = getValues()
  }
  const handleGoBack = () => {
    console.log('pressed')
    navigate('Dashboard')
  }

  return (
    <ModalProvider>
      <SafeAreaView style={styles.mainView}>
        <ScrollView style={{ marginBottom: isEdited ? 93 : 0 }}>
          <BaseOpacity onPress={handleGoBack} style={styles.backBtn} activeOpacity={0.5}>
            <IconBack />
          </BaseOpacity>
          <ProfilePicture setIsEditedTrue={setEditedTrue} setIsEditedFalse={setEditedFalse} />
          <ProfileDetails {...user} errors={errors} control={control} setIsEdited={setEditedTrue} />
          <TeamSubscriptions />
          <ProfileColor />
        </ScrollView>
        {isEdited && <SaveChangesButton handleEditDetailsSubmit={handleEditDetailsSubmit} />}
        {isChangesSavedModalVisible && (
          <ChangesSavedModal
            isVisible={isChangesSavedModalVisible}
            hideModal={hideChangesSavedModal}
            content={t('changesSaved')}
          />
        )}
      </SafeAreaView>
    </ModalProvider>
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
