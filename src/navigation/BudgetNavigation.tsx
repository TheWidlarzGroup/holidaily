import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Budget } from 'screens/budget/Budget'
import { PtoPolicy } from 'screens/budget/PtoPolicy'
import { BudgetRoutes } from './types'

const BudgetStack = createStackNavigator<BudgetRoutes>()

export const BudgetNavigation = () => (
  <BudgetStack.Navigator
    headerMode="none"
    initialRouteName="Budget"
    mode="modal"
    screenOptions={{
      ...TransitionPresets.ModalPresentationIOS,
      animationEnabled: true,
    }}>
    <BudgetStack.Screen name="Budget" component={Budget} />

    <BudgetStack.Screen name="PtoPolicy" component={PtoPolicy} />
  </BudgetStack.Navigator>
)
