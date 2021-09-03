import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Requests } from 'screens/manageRequests/Requests'
import { RequestView } from 'screens/manageRequests/components/RequestView'
import { AdminPanelRequestsRoutes } from './types'

const AdminPanelStack = createStackNavigator<AdminPanelRequestsRoutes>()

export const AdminPanelRequestsNavigation = () => (
  <AdminPanelStack.Navigator headerMode="none" initialRouteName="Requests">
    <AdminPanelStack.Screen name="Requests" component={Requests} />
    <AdminPanelStack.Screen name="RequestView" component={RequestView} />
  </AdminPanelStack.Navigator>
)
