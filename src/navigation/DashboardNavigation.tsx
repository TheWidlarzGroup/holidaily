import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Dashboard } from 'screens/dashboard/Dashboard'
import { DashboardTeam } from 'screens/dashboard/DashboardTeam'
import { DashboardTeamMember } from 'screens/dashboard/DashboardTeamMember'
import { DashboardRoutes } from './types'

const DashboardStack = createStackNavigator<DashboardRoutes>()

export const DashboardNavigation = () => (
  <DashboardStack.Navigator
    headerMode="none"
    initialRouteName="Dashboard"
    screenOptions={{
      cardStyle: {
        backgroundColor: 'transparent',
      },
    }}>
    <DashboardStack.Screen name="Dashboard" component={Dashboard} />
    <DashboardStack.Screen name="DashboardTeam" component={DashboardTeam} />
    <DashboardStack.Screen name="DashboardTeamMember" component={DashboardTeamMember} />
  </DashboardStack.Navigator>
)
