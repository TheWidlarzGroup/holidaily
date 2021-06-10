import React, { FC } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import { ProfilePicture } from './components/ProfilePicture'
import { ProfileDetails } from './components/ProfileDetails'
import { TeamSubscriptions } from './components/TeamSubscriptions'
import { ProfileColor } from './components/ProfileColor'

export const EditProfile: FC = () => (
  <ScrollView style={styles.mainView}>
    <ProfilePicture />
    <ProfileDetails />
    <TeamSubscriptions />
    <ProfileColor />
  </ScrollView>
)

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
  },
})
