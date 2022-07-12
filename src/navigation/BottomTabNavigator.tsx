import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Animated, { SharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { mkUseStyles, theme, Theme } from 'utils/theme'
import { TabsUi } from 'navigation/BottomNavComponents/TabsUi'
import { Calendar } from 'screens/calendar/Calendar'
import { Feed } from 'screens/feed/Feed'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { useDrawerProgress } from '@react-navigation/drawer'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { BottomTabRoutes } from './types'
import { DashboardNavigation } from './DashboardNavigation'
import { RequestsNavigation } from './RequestsNavigation'

const Tab = createBottomTabNavigator<BottomTabRoutes>()

const EmptyComponent = () => null
const tabs = [
  {
    name: 'DashboardNavigation',
  },
  { name: 'CALENDAR' },
  { name: 'RequestModal' },
  { name: 'Stats' },
  { name: 'FEED' },
]

const screenStyles = {
  shadowOffset: { width: 0, height: 0 },
  shadowColor: theme.colors.black,
  shadowRadius: 10,
  borderWidth: 0,
  backgroundColor: theme.colors.white,
  flex: 1,
}

type Props = {
  gestureEnabled: boolean
}

export const BottomTabNavigator = (props: Props) => {
  const styles = useStyles()
  const progress = useDrawerProgress() as Readonly<SharedValue<number>>
  const { width } = useDimensions()

  const style = useAnimatedStyle(() => {
    const screenScale = interpolate(progress.value, [0, 1], [1, 0.8])
    const screenTranslate = interpolate(progress.value, [0, 1], [0, 0.8 * width * -0.1])
    const screenShadowAndroid = interpolate(progress.value, [0, 1], [0, 10])
    const screenShadowIOS = interpolate(progress.value, [0, 1], [0, 0.2])

    return {
      transform: [{ scale: screenScale }, { translateX: screenTranslate }],
      shadowOpacity: screenShadowIOS,
      elevation: screenShadowAndroid,
    }
  })

  const screenOptions = {
    headerShown: false,
    gestureEnabled: props.gestureEnabled,
  }

  return (
    <SafeAreaWrapper edges={['bottom']}>
      <Animated.View style={[screenStyles, style]}>
        <SafeAreaView edges={['top']} style={styles.safeAreaTop}>
          <Tab.Navigator
            tabBar={(props) => <TabsUi {...{ tabs, ...props }} />}
            screenOptions={screenOptions}>
            <Tab.Screen
              name="DashboardNavigation"
              options={{ unmountOnBlur: true }}
              component={DashboardNavigation}
            />
            <Tab.Screen name="CALENDAR" component={Calendar} options={{ unmountOnBlur: true }} />
            <Tab.Screen name="RequestModal" component={EmptyComponent} />
            <Tab.Screen
              name="Stats"
              component={RequestsNavigation}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen name="FEED" component={Feed} />
          </Tab.Navigator>
        </SafeAreaView>
      </Animated.View>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  safeAreaTop: {
    flex: 1,
    backgroundColor: theme.colors.dashboardBackground,
  },
}))
