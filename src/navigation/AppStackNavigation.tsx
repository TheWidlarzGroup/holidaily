import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { windowHeight } from 'utils/deviceSizes'
import { RequestVacation } from 'screens/requestVacation/RequestVacation'
import { CalendarRequestVacation } from 'screens/requestVacation/components/CalendarRequestVacation'
import { GalleryScreen } from 'screens/gallery/GalleryScreen'
import { CreatePost } from 'screens/createPost/CreatePost'
import { Notifications } from 'screens/dashboard/Notifications'
import { SubscribeNewTeam } from 'screens/editProfile/components/SubscribeNewTeam'
import { DrawerNavigator } from './DrawerNavigator'
import { ModalRoutes } from './types'
import { StackNavigatorPresets } from './Presets/StackNavigatorPresets'

const AppStack = createStackNavigator<ModalRoutes>()

export const AppStackNavigation = () => {
  const styles = useStyle()
  return (
    <Box flex={1} backgroundColor="black">
      <AppStack.Navigator
        {...StackNavigatorPresets.modalNavigator}
        initialRouteName="DrawerNavigator">
        <AppStack.Screen
          name="DashboardNotifications"
          component={Notifications}
          options={{
            ...TransitionPresets.DefaultTransition,
            animationEnabled: false,
          }}
        />
        <AppStack.Screen name="RequestVacation" component={RequestVacation} />
        <AppStack.Screen
          name="RequestVacationCalendar"
          component={CalendarRequestVacation}
          options={RequestVacationCalendarOptions}
        />
        <AppStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <AppStack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            cardStyle: styles.galleryScreenCard,
            cardStyleInterpolator: undefined,
          }}
        />
        <AppStack.Screen name="CreatePost" component={CreatePost} />
        <AppStack.Screen name="SubscribeNewTeam" component={SubscribeNewTeam} />
      </AppStack.Navigator>
    </Box>
  )
}

const RequestVacationCalendarOptions: StackNavigationOptions = {
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [windowHeight, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
}

const useStyle = mkUseStyles((theme: Theme) => ({
  galleryScreenCard: {
    backgroundColor: theme.colors.modalBackground,
  },
}))
