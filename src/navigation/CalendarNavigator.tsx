import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Calendar } from 'screens/calendar/Calendar'
import { CalendarModal } from 'screens/calendar/components/CalendarModal'
import { CalendarProvider } from 'contexts/CalendarProvider'
import { StackNavigatorPresets } from './Presets/StackNavigatorPresets'
import { CalendarRoutes } from './types'

const CalendarStack = createStackNavigator<CalendarRoutes>()

const screenOptions = {
  headerShown: false,
}

export const CalendarNavigation = () => (
  <CalendarProvider>
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="CALENDAR" component={Calendar} options={screenOptions} />
      <CalendarStack.Group {...StackNavigatorPresets.modalNavigator}>
        <CalendarStack.Screen name="CALENDAR_MODAL" component={CalendarModal} />
      </CalendarStack.Group>
    </CalendarStack.Navigator>
  </CalendarProvider>
)
