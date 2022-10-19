import React, { FC } from 'react'
import { NavigationContainer, NavigationState } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

interface Props {
  params?: any
  component: FC
  stateChangeSpy?: F1<NavigationState>
}

const Stack = createStackNavigator()

export const MockedNavigator = ({ component, params = {}, stateChangeSpy }: Props) => (
  <NavigationContainer onUnhandledAction={stateChangeSpy as any}>
    <Stack.Navigator>
      <Stack.Screen name="MockedScreen" component={component} initialParams={params} />
    </Stack.Navigator>
  </NavigationContainer>
)
