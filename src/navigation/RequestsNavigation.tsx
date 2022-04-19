import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { SeeRequest } from 'components/RequestDetails/SeeRequest'
import { RequestsRoutes } from './types'
import { StatsAndRequests } from '../screens/stats/StatsAndRequests'

const RequestsStack = createStackNavigator<RequestsRoutes>()

export const RequestsNavigation = () => (
  <RequestsStack.Navigator
    initialRouteName="StatsAndRequests"
    screenOptions={{ headerShown: false }}>
    <RequestsStack.Screen name="StatsAndRequests" component={StatsAndRequests} />
    <RequestsStack.Screen
      name="SeeRequest"
      component={SeeRequest}
      options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
    />
  </RequestsStack.Navigator>
)
