import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { ChangePassword } from 'screens/editProfile/components/ChangePassword'
import { SubscribeNewTeam } from 'screens/editProfile/components/SubscribeNewTeam'
import { ModalProvider } from 'contexts/ModalProvider'
import { UserProfileRoutes } from './types'
import { ForgotPasswordNavigation } from './ForgotPasswordNavigation'

const ProfileStack = createStackNavigator<UserProfileRoutes>()

export const ProfileNavigation = () => (
  <ModalProvider>
    <ProfileStack.Navigator headerMode="none" initialRouteName="EditProfile">
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="ChangePassword" component={ChangePassword} />
      <ProfileStack.Screen name="SubscribeTeam" component={SubscribeNewTeam} />
      <ProfileStack.Screen name="Recovery" component={ForgotPasswordNavigation} />
    </ProfileStack.Navigator>
  </ModalProvider>
)
