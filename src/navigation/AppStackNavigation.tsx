import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { RequestVacation } from 'screens/requestVacation/RequestVacation'
import { CalendarRequestVacation } from 'screens/requestVacation/components/CalendarRequestVacation'
import { GalleryScreen } from 'screens/gallery/GalleryScreen'
import { CreatePost } from 'screens/createPost/CreatePost'
import { Notifications } from 'screens/dashboard/Notifications'
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
        <AppStack.Screen name="RequestVacationCalendar" component={CalendarRequestVacation} />
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
      </AppStack.Navigator>
    </Box>
  )
}

const useStyle = mkUseStyles((theme: Theme) => ({
  galleryScreenCard: {
    backgroundColor: theme.colors.modalBackground,
  },
}))
