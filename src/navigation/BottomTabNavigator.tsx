import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { mkUseStyles, Theme, theme } from 'utils/theme'
import { TabsUi } from 'navigation/BottomNavComponents/TabsUi'
import { Feed } from 'screens/feed/Feed'
import { useDrawerProgress } from '@react-navigation/drawer'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { isIos } from 'utils/layout'
import { AnimatedBox } from 'components/AnimatedBox'
import { BottomTabRoutes } from './types'
import { DashboardNavigation } from './DashboardNavigation'
import { RequestsNavigation } from './RequestsNavigation'
import { CalendarNavigation } from './CalendarNavigator'
import { useGetActiveRouteName } from 'utils/useGetActiveRouteName'

const Tab = createBottomTabNavigator<BottomTabRoutes>()

const EmptyComponent = () => null
const tabs = [
  { name: 'DashboardNavigation' },
  { name: 'CALENDAR_NAVIGATION' },
  { name: 'RequestModal' },
  { name: 'Stats' },
  { name: 'FEED' },
]

const OPEN_DRAWER_SCREEN_BORDER = theme.borderRadii.l

export const BottomTabNavigator = () => {
  const progress = useDrawerProgress() as Readonly<SharedValue<number>>
  const { width } = useDimensions()

  const styles = useStyles()

  const activeRouteName = useGetActiveRouteName()

  const animatedStyle = useAnimatedStyle(() => {
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

  const animatedTopBoxStyle = useAnimatedStyle(() => ({
    borderTopLeftRadius: interpolate(
      progress.value,
      [0, OPEN_DRAWER_SCREEN_BORDER],
      [OPEN_DRAWER_SCREEN_BORDER, 0]
    ),
  }))

  const isCalendarModalScreen = activeRouteName === 'CALENDAR_MODAL'

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.outerSafeArea}>
      <AnimatedBox style={[styles.animatedBox, animatedStyle]}>
        <Tab.Navigator
          tabBar={(props) => <TabsUi {...{ tabs, isCalendarModalScreen, ...props }} />}
          screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="DashboardNavigation"
            options={{ unmountOnBlur: true }}
            component={DashboardNavigation}
          />
          <Tab.Screen
            name="CALENDAR_NAVIGATION"
            component={CalendarNavigation}
            options={{ unmountOnBlur: true }}
          />
          <Tab.Screen name="RequestModal" component={EmptyComponent} />
          <Tab.Screen
            name="Stats"
            component={RequestsNavigation}
            options={{ unmountOnBlur: true }}
          />
          <Tab.Screen name="FEED" component={Feed} />
        </Tab.Navigator>
        {/* Comment: Box below covers different color of top edge of SafeAreaView, as it's not possible to add different color on top than bottom */}
        {isCalendarModalScreen ? null : (
          <AnimatedBox
            position="absolute"
            backgroundColor="dashboardBackground"
            height={isIos ? 50 : 30}
            width="100%"
            style={animatedTopBoxStyle}
          />
        )}
      </AnimatedBox>
    </SafeAreaView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  outerSafeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  innerSafeArea: {
    flex: 1,
    marginTop: isIos ? -6 : 0,
    marginBottom: -7,
    backgroundColor: theme.colors.white,
    borderRadius: OPEN_DRAWER_SCREEN_BORDER,
    overflow: 'hidden',
  },
  animatedBox: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: theme.colors.black,
    shadowRadius: 10,
    borderWidth: 0,
    flex: 1,
    borderRadius: OPEN_DRAWER_SCREEN_BORDER,
  },
}))
