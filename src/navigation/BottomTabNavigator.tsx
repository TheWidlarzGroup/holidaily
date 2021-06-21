import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Animated from 'react-native-reanimated'
import { ViewProps } from 'react-native'
import { TabsUi } from 'navigation/BottomNavComponents/TabsUi'
import { Calendar } from 'screens/calendar/Calendar'
import { Panel } from 'screens/panel/Panel'
import { Chat } from 'screens/chat/Chat'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { BottomTabRoutes } from './types'
import { DashboardNavigation } from './DashboardNavigation'

const Tab = createBottomTabNavigator<BottomTabRoutes>()

const EmptyComponent = () => null
const tabs = [
  {
    name: 'DashboardNavigation',
  },
  { name: 'Calendar' },
  { name: 'RequestModal' },
  { name: 'Panel' },
  { name: 'Chat' },
]
export const BottomTabNavigator = ({ style }: ViewProps) => (
  <SafeAreaWrapper>
    <Animated.View style={[style, { flex: 1 }]}>
      <Tab.Navigator tabBar={(props) => <TabsUi {...{ tabs, ...props }} />}>
        <Tab.Screen
          name="DashboardNavigation"
          options={{ unmountOnBlur: true }}
          component={DashboardNavigation}
        />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="RequestModal" component={EmptyComponent} />
        <Tab.Screen name="Panel" component={Panel} />
        <Tab.Screen name="Chat" component={Chat} />
      </Tab.Navigator>
    </Animated.View>
  </SafeAreaWrapper>
)
