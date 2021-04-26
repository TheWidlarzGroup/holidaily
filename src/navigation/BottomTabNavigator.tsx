import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'

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

export const BottomTabNavigator = () => {
  const { t } = useTranslation('navigation')
  return (
    <Tab.Navigator
      tabBarOptions={{ inactiveTintColor: colors.grey, activeTintColor: colors.tertiary }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ tabBarIcon: ({ color }) => <HomeIcon fill={color} />, title: t('dashboard') }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{ tabBarIcon: ({ color }) => <CalendarIcon fill={color} />, title: t('calendar') }}
      />
      <Tab.Screen
        name="Panel"
        component={Panel}
        options={{ tabBarIcon: ({ color }) => <PasteIcon fill={color} />, title: t('panel') }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ tabBarIcon: ({ color }) => <MessageIcon fill={color} />, title: t('chat') }}
      />
    </Tab.Navigator>
  )
}
