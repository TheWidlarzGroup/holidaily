import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabRoutes } from './types'
import { Dashboard } from 'screens/dashboard/Dashboard'
import { Calendar } from 'screens/calendar/Calendar'
import { Panel } from 'screens/panel/Panel'
import { Chat } from 'screens/chat/Chat'

const Tab = createBottomTabNavigator<BottomTabRoutes>()

export const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Calendar" component={Calendar} />
    <Tab.Screen name="Panel" component={Panel} />
    <Tab.Screen name="Chat" component={Chat} />
  </Tab.Navigator>
)
