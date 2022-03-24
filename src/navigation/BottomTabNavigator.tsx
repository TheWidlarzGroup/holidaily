import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Animated from 'react-native-reanimated'
import { ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { mkUseStyles, Theme } from 'utils/theme'
import { TabsUi } from 'navigation/BottomNavComponents/TabsUi'
import { Calendar } from 'screens/calendar/Calendar'
import { Feed } from 'screens/feed/Feed'
import { StatsAndRequests } from 'screens/stats/StatsAndRequests'
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
  { name: 'Stats' },
  { name: 'Feed' },
]

export const MIN_PLUS_ICON_WIDTH = 80

export const BottomTabNavigator = ({ style }: ViewProps) => {
  const styles = useStyles()
  return (
    <SafeAreaWrapper edges={['bottom']}>
      <Animated.View style={[style, { flex: 1 }]}>
        <SafeAreaView edges={['top']} style={styles.safeAreaTop}>
          <Tab.Navigator tabBar={(props) => <TabsUi {...{ tabs, ...props }} />}>
            <Tab.Screen
              name="DashboardNavigation"
              options={{ unmountOnBlur: true }}
              component={DashboardNavigation}
            />
            <Tab.Screen name="Calendar" component={Calendar} />
            <Tab.Screen name="RequestModal" component={EmptyComponent} />
            <Tab.Screen name="Stats" component={StatsAndRequests} />
            <Tab.Screen name="Feed" component={Feed} />
          </Tab.Navigator>
        </SafeAreaView>
      </Animated.View>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  safeAreaTop: {
    flex: 1,
    backgroundColor: theme.colors.bottomTabBgColor,
  },
}))
