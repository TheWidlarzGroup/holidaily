import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Requests } from 'screens/manageRequests/Requests'
import { AdminPanelRequestsRoutes } from './types'

const AdminPanelStack = createStackNavigator<AdminPanelRequestsRoutes>()

export const AdminPanelRequestsNavigation = () => (
  <AdminPanelStack.Navigator headerMode="none" initialRouteName="Requests">
    <AdminPanelStack.Screen name="Requests" component={Requests} />
  </AdminPanelStack.Navigator>
)
