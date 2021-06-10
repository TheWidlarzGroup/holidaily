import React from 'react'
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native'

import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'

export const EditProfile = () => (
  <SafeAreaView>
    <ScrollView style={styles.mainView}>
      <ProfilePicture />
      <ProfileDetails />
      <TeamSubscriptions />
      <ProfileColor />
    </ScrollView>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },
})
