import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { BubbleContainer } from 'screens/editProfile/components/bubblePicker/BubbleContainer'
import { UserProfileRoutes } from './types'
import { StackNavigatorPresets } from './Presets/StackNavigatorPresets'

const ProfileStack = createStackNavigator<UserProfileRoutes>()

export const ProfileNavigation = () => (
  <ProfileStack.Navigator {...StackNavigatorPresets.modalNavigator}>
    <ProfileStack.Screen name="EDIT_PROFILE" component={EditProfile} />
    <ProfileStack.Screen name="COLOR_PICKER" component={BubbleContainer} />
  </ProfileStack.Navigator>
)
