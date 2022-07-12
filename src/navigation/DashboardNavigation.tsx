import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Dashboard } from 'screens/dashboard/Dashboard'
import { DashboardTeam } from 'screens/dashboard/DashboardTeam'
import { DashboardRoutes } from './types'

const DashboardStack = createStackNavigator<DashboardRoutes>()

const screenOptions = {
  headerShown: false,
}

export const DashboardNavigation = () => (
  <DashboardStack.Navigator screenOptions={screenOptions} initialRouteName="DASHBOARD">
    <DashboardStack.Screen name="DASHBOARD" component={Dashboard} />
    <DashboardStack.Screen
      name="DASHBOARD_TEAM"
      component={DashboardTeam}
      options={TransitionPresets.SlideFromRightIOS}
    />
  </DashboardStack.Navigator>
)
