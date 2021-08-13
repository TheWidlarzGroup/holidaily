import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AdminPanel } from 'screens/adminPanel/AdminPanel'
import { ManageRequests } from 'screens/adminPanel/ManageRequests'
import { AdminPanelRoutes } from './types'

const AdminPanelStack = createStackNavigator<AdminPanelRoutes>()

export const AdminPanelNavigation = () => (
  <AdminPanelStack.Navigator headerMode="none" initialRouteName="Panel">
    <AdminPanelStack.Screen name="Panel" component={AdminPanel} />
    <AdminPanelStack.Screen name="Requests" component={ManageRequests} />
  </AdminPanelStack.Navigator>
)
