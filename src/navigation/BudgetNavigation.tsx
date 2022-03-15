import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Budget } from 'screens/budget/Budget'
import { PtoPolicy } from 'screens/budget/PtoPolicy'
import { BudgetRoutes } from './types'

const BudgetStack = createStackNavigator<BudgetRoutes>()

export const BudgetNavigation = () => (
  <BudgetStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: 'transparent' },
      cardOverlayEnabled: true,
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
            extrapolate: 'clamp',
          }),
        },
      }),
    }}
    mode="modal">
    <BudgetStack.Screen name="Budget" component={Budget} />

    <BudgetStack.Screen name="PtoPolicy" component={PtoPolicy} />
  </BudgetStack.Navigator>
)
