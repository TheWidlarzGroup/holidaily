import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Slider } from 'screens/slider/Slider'
import { Signup } from 'screens/signup/Signup'
import { Welcome } from 'screens/welcome/Welcome'
import { About } from 'screens/about/About'
import { AuthRoutes } from './types'

const AppStack = createStackNavigator<AuthRoutes>()

type AuthStackNavigationProps = {
  initialRoute?: keyof AuthRoutes
  userLoggedOut?: true
}

const screenOptions = {
  headerShown: false,
}

export const AuthStackNavigation = ({
  initialRoute = 'SLIDER',
  userLoggedOut,
}: AuthStackNavigationProps) => (
  <AppStack.Navigator screenOptions={screenOptions} initialRouteName={initialRoute}>
    <AppStack.Screen name="SLIDER" component={Slider} />
    <AppStack.Screen name="WELCOME" component={Welcome} initialParams={{ userLoggedOut }} />
    <AppStack.Screen name="ABOUT" component={About} />
    <AppStack.Screen name="Signup" component={Signup} />
  </AppStack.Navigator>
)
