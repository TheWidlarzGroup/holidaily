import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { BubbleContainer } from 'screens/editProfile/components/bubblePicker/BubbleContainer'
import { UserProfileRoutes } from './types'
import { ForgotPasswordNavigation } from './ForgotPasswordNavigation'
import { StackNavigatorPresets } from './Presets/StackNavigatorPresets'

const ProfileStack = createStackNavigator<UserProfileRoutes>()

export const ProfileNavigation = () => (
  <ProfileStack.Navigator {...StackNavigatorPresets.modalNavigator}>
    <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    {/* <ProfileStack.Screen name="ChangePassword" component={ChangePassword} /> */}
    <ProfileStack.Screen name="ColorPicker" component={BubbleContainer} />
    <ProfileStack.Screen name="Recovery" component={ForgotPasswordNavigation} />
  </ProfileStack.Navigator>
)
