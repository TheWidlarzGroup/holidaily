import React, { useState, useEffect } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CustomButton } from 'components/CustomButton'
import { mkUseStyles, Theme, Box } from 'utils/theme'
import { ChangesSavedModal } from './components/ChangesSavedModal'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'

import { USER_DATA } from './helpers/mockedData'

export const EditProfile = () => {
  const styles = useStyles()
  const { errors, control, setValue, getValues } = useForm()
  const { t } = useTranslation('userProfile')
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false)

  const handleEditSubmit = () => {
    setIsEdited(false)
    setIsConfirmationModalVisible(true)
    const values = getValues()
    console.log(values)
    // TODO: function updating user data with values
  }

  useEffect(() => {
    if (USER_DATA) {
      const { firstName, lastName, role, password } = USER_DATA
      setValue('nameSurname', `${firstName} ${lastName}`)
      setValue('role', role)
      setValue('password', password)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER_DATA])

  return (
    <>
      <SafeAreaView style={styles.mainView}>
        <ScrollView style={{ marginBottom: isEdited ? 100 : 0 }}>
          <ProfilePicture />
          <ProfileDetails
            {...USER_DATA}
            errors={errors}
            control={control}
            setIsEdited={setIsEdited}
          />
          <TeamSubscriptions />
          <ProfileColor />
        </ScrollView>
        {isEdited && (
          <Box position="absolute" bottom={0} backgroundColor="white" height={100} paddingTop="m">
            <CustomButton label={'Save changes'} variant="primary" onPress={handleEditSubmit} />
          </Box>
        )}
      </SafeAreaView>
      {isConfirmationModalVisible && (
        <ChangesSavedModal
          isVisible={isConfirmationModalVisible}
          hideModal={() => setIsConfirmationModalVisible(false)}
          content={t('changesSaved')}
        />
      )}
    </>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  mainView: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
}))
