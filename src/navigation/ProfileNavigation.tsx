import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { SubscribeNewTeam } from 'screens/editProfile/components/SubscribeNewTeam'
import { BubbleContainer } from 'screens/editProfile/components/bubblePicker/BubbleContainer'
import { UserProfileRoutes } from './types'
import { ForgotPasswordNavigation } from './ForgotPasswordNavigation'
import { StackNavigatorPresets } from './Presets/StackNavigatorPresets'

const ProfileStack = createStackNavigator<UserProfileRoutes>()

export const ProfileNavigation = () => (
  <ProfileStack.Navigator {...StackNavigatorPresets.modalNavigator}>
    <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    {/* <ProfileStack.Screen name="ChangePassword" component={ChangePassword} /> */}
    <ProfileStack.Screen
      name="ColorPicker"
      component={BubbleContainer}
      options={{ cardStyle: { opacity: 0.95 } }}
    />
    <ProfileStack.Screen name="SubscribeTeam" component={SubscribeNewTeam} />
    <ProfileStack.Screen name="Recovery" component={ForgotPasswordNavigation} />
  </ProfileStack.Navigator>
)
