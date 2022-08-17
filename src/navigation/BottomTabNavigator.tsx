import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Box, mkUseStyles, Theme, theme } from 'utils/theme'
import { TabsUi } from 'navigation/BottomNavComponents/TabsUi'
import { Feed } from 'screens/feed/Feed'
import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { isIos } from 'utils/layout'
import { AnimatedBox } from 'components/AnimatedBox'
import { useGetActiveRouteName } from 'utils/useGetActiveRouteName'
import { BottomTabRoutes } from './types'
import { DashboardNavigation } from './DashboardNavigation'
import { RequestsNavigation } from './RequestsNavigation'
import { CalendarNavigation } from './CalendarNavigator'

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
  const isDrawerOpen = useDrawerStatus() === 'open'
  const { width } = useDimensions()
  const safeAreaInsets = useSafeAreaInsets()

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

  const containerBorderRadius = { borderRadius: isDrawerOpen ? OPEN_DRAWER_SCREEN_BORDER : 0 }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.outerSafeArea}>
      <AnimatedBox style={[styles.animatedBox, animatedStyle]}>
        <Box style={[styles.boxShadow, containerBorderRadius]}>
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
              height={safeAreaInsets.top}
              width="100%"
              style={animatedTopBoxStyle}
            />
          )}
        </Box>
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
    flex: 1,
    shadowRadius: 8,
    borderRadius: OPEN_DRAWER_SCREEN_BORDER,
  },
  boxShadow: {
    flex: 1,
    shadowOffset: { width: 0, height: 5 },
    borderRadius: OPEN_DRAWER_SCREEN_BORDER,
    shadowColor: theme.colors.black,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    overflow: 'hidden',
  },
}))
