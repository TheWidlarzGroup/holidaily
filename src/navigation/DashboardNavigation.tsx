import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Dashboard } from 'screens/dashboard/Dashboard'
import { DashboardTeam } from 'screens/dashboard/DashboardTeam'
import { SafeAreaView } from 'react-native-safe-area-context'
import { mkUseStyles } from 'utils/theme'
import { DashboardRoutes } from './types'

const DashboardStack = createStackNavigator<DashboardRoutes>()

const screenOptions = {
  headerShown: false,
}

export const DashboardNavigation = () => {
  const styles = useSafeAreaStyles()

  return (
    <SafeAreaView edges={['top']} style={styles.safeAreaTop}>
      <DashboardStack.Navigator screenOptions={screenOptions} initialRouteName="DASHBOARD">
        <DashboardStack.Screen name="DASHBOARD" component={Dashboard} />
        <DashboardStack.Screen
          name="DASHBOARD_TEAM"
          component={DashboardTeam}
          options={TransitionPresets.SlideFromRightIOS}
        />
      </DashboardStack.Navigator>
    </SafeAreaView>
  )
}

export const useSafeAreaStyles = mkUseStyles((theme) => ({
  safeAreaTop: {
    flex: 1,
    backgroundColor: theme.colors.dashboardBackground,
  },
}))
