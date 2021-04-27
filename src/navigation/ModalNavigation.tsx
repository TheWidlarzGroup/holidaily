import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EmptyComponent } from 'components/EmptyComponent'

const AppStack = createStackNavigator<any>()

export const ModalNavigation = () => (
  <AppStack.Navigator mode="modal" headerMode="none">
    <AppStack.Screen name="Request" component={EmptyComponent} />
  </AppStack.Navigator>
)
