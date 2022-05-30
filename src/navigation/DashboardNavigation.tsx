import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Dashboard } from 'screens/dashboard/Dashboard'
import { DashboardTeam } from 'screens/dashboard/DashboardTeam'
import { DashboardRoutes } from './types'

const DashboardStack = createStackNavigator<DashboardRoutes>()

export const DashboardNavigation = () => (
  <DashboardStack.Navigator headerMode="none" initialRouteName="DASHBOARD">
    <DashboardStack.Screen name="DASHBOARD" component={Dashboard} />
    <DashboardStack.Screen name="DASHBOARD_TEAM" component={DashboardTeam} />
  </DashboardStack.Navigator>
)
