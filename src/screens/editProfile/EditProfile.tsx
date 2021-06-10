import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { mkUseStyles, Theme } from 'utils/theme/index'

import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'

export const EditProfile = () => {
  const styles = useStyles()

  return (
    <SafeAreaView>
      <ScrollView style={styles.mainView}>
        <ProfilePicture />
        <ProfileDetails />
        <TeamSubscriptions />
        <ProfileColor />
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  mainView: {
    backgroundColor: theme.colors.white,
  },
}))
