import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Budget } from 'screens/budget/Budget'
import { PtoPolicy } from 'screens/budget/PtoPolicy'
import { BudgetRoutes } from './types'
import { StackNavigatorPresets } from './Presets/StackNavigatorPresets'

const BudgetStack = createStackNavigator<BudgetRoutes>()

export const BudgetNavigation = () => (
  <BudgetStack.Navigator {...StackNavigatorPresets.modalNavigator}>
    <BudgetStack.Screen name="BUDGET" component={Budget} />
    <BudgetStack.Screen name="PTO_POLICY" component={PtoPolicy} />
  </BudgetStack.Navigator>
)
