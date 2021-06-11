import React, { useState } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
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
  const { t } = useTranslation('userProfile')
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false)

  const handleEditSubmit = () => {
    setIsEdited(false)
    setIsConfirmationModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView style={isEdited ? { marginBottom: 100 } : { marginBottom: 0 }}>
        <ProfilePicture />
        <ProfileDetails {...USER_DATA} setIsEdited={setIsEdited} />
        <TeamSubscriptions />
        <ProfileColor />
      </ScrollView>
      {isEdited && (
        <Box position="absolute" bottom={0} backgroundColor="white" height={100} paddingTop="m">
          <CustomButton label={'Save changes'} variant="primary" onPress={handleEditSubmit} />
        </Box>
      )}
      {isConfirmationModalVisible && (
        <ChangesSavedModal
          isVisible={isConfirmationModalVisible}
          hideModal={() => setIsConfirmationModalVisible(false)}
          content={t('changesSaved')}
        />
      )}
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  mainView: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
}))
