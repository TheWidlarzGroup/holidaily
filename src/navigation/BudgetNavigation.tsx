import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Budget } from 'screens/budget/Budget'
import { PtoPolicy } from 'screens/budget/PtoPolicy'
import { BudgetRoutes } from './types'

const BudgetStack = createStackNavigator<BudgetRoutes>()

const screenOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
}

export const BudgetNavigation = () => (
  <BudgetStack.Navigator screenOptions={screenOptions}>
    <BudgetStack.Screen name="BUDGET" component={Budget} />
    <BudgetStack.Screen
      name="PTO_POLICY"
      component={PtoPolicy}
      options={TransitionPresets.SlideFromRightIOS}
    />
  </BudgetStack.Navigator>
)
