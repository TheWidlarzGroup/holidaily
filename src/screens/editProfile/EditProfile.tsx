import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CustomButton } from 'components/CustomButton'
import { mkUseStyles, Theme, Box } from 'utils/theme'
import { useBooleanState } from 'hooks/useBooleanState'
import { useUserContext } from 'hooks/useUserContext'
import { splitName } from 'utils/splitName'
import { ChangesSavedModal } from './components/ChangesSavedModal'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'

export const EditProfile = () => {
  const { user } = useUserContext()
  const { firstName, lastName, role } = user
  const styles = useStyles()
  const { errors, control, getValues } = useForm({
    defaultValues: {
      nameSurname: `${firstName} ${lastName}`,
      role,
    },
  })
  const { t } = useTranslation('userProfile')
  const [isEdited, { setTrue: setEditedTrue, setFalse: setEditedFalse }] = useBooleanState(false)
  const [isConfirmationModalVisible, { setTrue, setFalse }] = useBooleanState(false)

  const handleEditSubmit = () => {
    setEditedFalse()
    setTrue()
    const { nameSurname, role } = getValues()
    const [firstName, lastName] = splitName(nameSurname)
    const formattedValues = {
      firstName,
      lastName,
      role,
    }
    console.log(formattedValues)
    // TODO: function updating user data with formattedValues
  }

  return (
    <>
      <SafeAreaView style={styles.mainView}>
        <ScrollView style={{ marginBottom: isEdited ? 100 : 0 }}>
          <ProfilePicture />
          <ProfileDetails {...user} errors={errors} control={control} setIsEdited={setEditedTrue} />
          <TeamSubscriptions />
          <ProfileColor />
        </ScrollView>
        {isEdited && (
          <Box
            position="absolute"
            bottom={0}
            backgroundColor="white"
            height={100}
            paddingTop="m"
            style={styles.shadow}>
            <CustomButton label={t('saveChanges')} variant="primary" onPress={handleEditSubmit} />
          </Box>
        )}
        {isConfirmationModalVisible && (
          <ChangesSavedModal
            isVisible={isConfirmationModalVisible}
            hideModal={setFalse}
            content={t('changesSaved')}
          />
        )}
      </SafeAreaView>
    </>
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
}))
