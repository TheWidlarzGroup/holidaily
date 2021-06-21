import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { ViewProps } from 'react-native'

import { TabsUi } from 'navigation/BottomNavComponents/TabsUi'
import { Calendar } from 'screens/calendar/Calendar'
// import { Panel } from 'screens/panel/Panel'
import { Feed } from 'screens/feed/Feed'
import { Chat } from 'screens/chat/Chat'
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
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <Animated.View style={[style, { flex: 1 }]}>
      <Tab.Navigator tabBar={(props) => <TabsUi {...{ tabs, ...props }} />}>
        <Tab.Screen
          name="DashboardNavigation"
          // options={{ unmountOnBlur: true }}
          component={DashboardNavigation}
        />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="RequestModal" component={EmptyComponent} />
        <Tab.Screen name="Panel" component={Feed} />
        <Tab.Screen name="Chat" component={Chat} />
      </Tab.Navigator>
    </Animated.View>
  </SafeAreaView>
)
