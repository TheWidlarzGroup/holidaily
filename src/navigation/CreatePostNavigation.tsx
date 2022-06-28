import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { LocationForm } from 'screens/createPost/CreatePostForm/LocationForm'
import { CreatePost } from 'screens/createPost/CreatePost'
import { CreatePostProvider } from 'contexts/CreatePostProvider'
import { CreatePostRoutes } from './types'
import { StackNavigatorPresets } from './Presets/StackNavigatorPresets'

const CreatePostStack = createStackNavigator<CreatePostRoutes>()

export const CreatePostNavigation = () => (
  <CreatePostProvider>
    <CreatePostStack.Navigator
      headerMode="none"
      initialRouteName="CREATE_POST"
      {...StackNavigatorPresets.modalNavigator}>
      <CreatePostStack.Screen name="CREATE_POST" component={CreatePost} />
      <CreatePostStack.Screen
        name="LOCATION_FORM"
        component={LocationForm}
        options={TransitionPresets.SlideFromRightIOS}
      />
    </CreatePostStack.Navigator>
  </CreatePostProvider>
)
