import React, { useState } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { mkUseStyles, Theme } from 'utils/theme'

import { CustomButton } from 'components/CustomButton'
import { ChangesSavedModal } from './components/ChangesSavedModal'
import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'

import { USER_DATA } from './helpers/mockedData'

export const EditProfile = () => {
  const styles = useStyles()
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false)

  const handleEditSubmit = () => {
    setIsEdited(false)
    setIsConfirmationModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView>
        <ProfilePicture />
        <ProfileDetails {...USER_DATA} setIsEdited={setIsEdited} />
        <TeamSubscriptions />
        <ProfileColor />
      </ScrollView>
      {isEdited && (
        <CustomButton label={'Save changes'} variant="primary" onPress={handleEditSubmit} />
      )}
      {isConfirmationModalVisible && (
        <ChangesSavedModal
          isVisible={isConfirmationModalVisible}
          hideModal={() => setIsConfirmationModalVisible(false)}
          content="Changes saved"
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
