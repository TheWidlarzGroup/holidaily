import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Dashboard } from 'screens/dashboard/Dashboard'
import { DashboardTeam } from 'screens/dashboard/DashboardTeam'
import { DashboardTeamMember } from 'screens/dashboard/DashboardTeamMember'
import { useFocusEffect } from '@react-navigation/native'
import { useColors } from 'utils/theme/index'
import { StatusBar } from 'react-native'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import { DashboardRoutes } from './types'

const DashboardStack = createStackNavigator<DashboardRoutes>()

export const DashboardNavigation = () => {
  const { disabledText, transparent } = useColors()
  useFocusEffect(() => {
    StatusBar.setBackgroundColor(disabledText)
    return () => {
      StatusBar.setBackgroundColor(transparent)
    }
  })
  const isDrawerOpen = useIsDrawerOpen()
  useEffect(() => {
    if (!isDrawerOpen) return
    StatusBar.setBackgroundColor(transparent)
  }, [isDrawerOpen, transparent])

  return (
    <DashboardStack.Navigator headerMode="none" initialRouteName="Dashboard">
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
      <DashboardStack.Screen name="DashboardTeam" component={DashboardTeam} />
      <DashboardStack.Screen name="DashboardTeamMember" component={DashboardTeamMember} />
    </DashboardStack.Navigator>
  )
}
