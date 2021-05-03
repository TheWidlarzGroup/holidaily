import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Dashboard } from 'screens/dashboard/Dashboard'
import { Calendar } from 'screens/calendar/Calendar'
import { Panel } from 'screens/panel/Panel'
import { Chat } from 'screens/chat/Chat'
import { BottomTabRoutes } from './types'
import { TabsUi } from 'components/BottomNav/TabsUi'

const Tab = createBottomTabNavigator<BottomTabRoutes>()

const EmptyComponent = () => null
const tabs = [
  {
    name: 'Dashboard',
  },
  { name: 'Calendar' },
  { name: 'RequestModal' },
  { name: 'Panel' },
  { name: 'Chat' },
]
export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabsUi {...{ tabs, ...props }} />}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="RequestModal" component={EmptyComponent} />
      <Tab.Screen name="Panel" component={Panel} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  )
}
