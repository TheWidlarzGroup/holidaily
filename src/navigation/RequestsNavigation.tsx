import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { SeeRequest } from 'components/RequestDetails/SeeRequest'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RequestsRoutes } from './types'
import { StatsAndRequests } from '../screens/stats/StatsAndRequests'
import { useSafeAreaStyles } from './DashboardNavigation'

const RequestsStack = createStackNavigator<RequestsRoutes>()

const screenOptions = {
  headerShown: false,
}

export const RequestsNavigation = () => {
  const styles = useSafeAreaStyles()

  return (
    <SafeAreaView edges={['top']} style={styles.safeAreaTop}>
      <RequestsStack.Navigator initialRouteName="STATS_AND_REQUESTS" screenOptions={screenOptions}>
        <RequestsStack.Screen name="STATS_AND_REQUESTS" component={StatsAndRequests} />
        <RequestsStack.Screen
          name="SEE_REQUEST"
          component={SeeRequest}
          options={TransitionPresets.SlideFromRightIOS}
        />
      </RequestsStack.Navigator>
    </SafeAreaView>
  )
}
