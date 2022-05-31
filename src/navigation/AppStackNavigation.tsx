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
        initialRouteName="DRAWER_NAVIGATOR">
        <AppStack.Screen
          name="NOTIFICATIONS"
          component={Notifications}
          options={{
            ...TransitionPresets.DefaultTransition,
            animationEnabled: false,
          }}
        />
        <AppStack.Screen name="REQUEST_VACATION" component={RequestVacation} />
        <AppStack.Screen
          name="REQUEST_VACATION_CALENDAR"
          component={CalendarRequestVacation}
          // options={RequestVacationCalendarOptions}
        />
        <AppStack.Screen name="DRAWER_NAVIGATOR" component={DrawerNavigator} />
        <AppStack.Screen
          name="GALLERY"
          component={GalleryScreen}
          options={{
            cardStyle: styles.galleryScreenCard,
            cardStyleInterpolator: undefined,
          }}
        />
        <AppStack.Screen name="CREATE_POST" component={CreatePost} />
        <AppStack.Screen name="SUBSCRIBE_NEW_TEAM" component={SubscribeNewTeam} />
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
