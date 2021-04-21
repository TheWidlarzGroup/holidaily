import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Dashboard } from 'screens/dashboard/Dashboard'
import { Calendar } from 'screens/calendar/Calendar'
import { Panel } from 'screens/panel/Panel'
import { Chat } from 'screens/chat/Chat'
import { HomeIcon } from 'assets/icons/HomeIcon'
import { CalendarIcon } from 'assets/icons/CalendarIcon'
import { MessageIcon } from 'assets/icons/MessageIcon'
import { PasteIcon } from 'assets/icons/PasteIcon'
import { colors } from 'utils/theme/colors'
import { BottomTabRoutes } from './types'

const Tab = createBottomTabNavigator<BottomTabRoutes>()

export const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{ inactiveTintColor: colors.grey, activeTintColor: colors.tertiary }}>
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{ tabBarIcon: ({ color }) => <HomeIcon fill={color} /> }}
    />
    <Tab.Screen
      name="Calendar"
      component={Calendar}
      options={{ tabBarIcon: ({ color }) => <CalendarIcon fill={color} /> }}
    />
    <Tab.Screen
      name="Panel"
      component={Panel}
      options={{ tabBarIcon: ({ color }) => <PasteIcon fill={color} /> }}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{ tabBarIcon: ({ color }) => <MessageIcon fill={color} /> }}
    />
  </Tab.Navigator>
)
