import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { SubscribeNewTeam } from 'screens/editProfile/components/SubscribeNewTeam'
import { BubbleContainer } from 'screens/editProfile/components/bubblePicker/BubbleContainer'

import { UserDetailsProvider } from 'screens/editProfile/helpers/UserDetailsContext'
import { UserProfileRoutes } from './types'
import { ForgotPasswordNavigation } from './ForgotPasswordNavigation'

const ProfileStack = createStackNavigator<UserProfileRoutes>()

export const ProfileNavigation = () => (
  <UserDetailsProvider>
    <ProfileStack.Navigator headerMode="none" initialRouteName="EditProfile" mode="modal">
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
  </UserDetailsProvider>
)
