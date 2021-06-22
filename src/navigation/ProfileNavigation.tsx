import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { ChangePassword } from 'screens/editProfile/components/ChangePassword'
import { UserProfileRoutes } from './types'

const ProfileStack = createStackNavigator<UserProfileRoutes>()

export const ProfileNavigation = () => (
  <ProfileStack.Navigator headerMode="none" initialRouteName="EditProfile">
    <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    <ProfileStack.Screen name="ChangePassword" component={ChangePassword} />
  </ProfileStack.Navigator>
)
