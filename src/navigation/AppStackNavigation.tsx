import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { RequestVacation } from 'screens/requestVacation/RequestVacation'
import { CalendarRequestVacation } from 'screens/requestVacation/components/CalendarRequestVacation'
import { GalleryScreen } from 'screens/gallery/GalleryScreen'
import { Notifications } from 'screens/dashboard/Notifications'
import { PrivacyPolicy } from 'screens/about/components/PrivacyPolicy'
import { SubscribeNewTeam } from 'screens/editProfile/components/SubscribeNewTeam'
import { DrawerNavigator } from './DrawerNavigator'
import { ModalRoutes } from './types'
import { StackNavigatorPresets } from './Presets/StackNavigatorPresets'
import { CreatePostNavigation } from './CreatePostNavigation'

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
          options={TransitionPresets.DefaultTransition}
        />
        <AppStack.Screen name="REQUEST_VACATION" component={RequestVacation} />
        <AppStack.Screen name="REQUEST_VACATION_CALENDAR" component={CalendarRequestVacation} />
        <AppStack.Screen name="DRAWER_NAVIGATOR" component={DrawerNavigator} />
        <AppStack.Screen
          name="GALLERY"
          component={GalleryScreen}
          options={{
            cardStyle: styles.galleryScreenCard,
            ...TransitionPresets.ModalTransition,
          }}
        />
        <AppStack.Screen name="SUBSCRIBE_NEW_TEAM" component={SubscribeNewTeam} />
        <AppStack.Screen
          name="PRIVACY_POLICY"
          component={PrivacyPolicy}
          options={TransitionPresets.SlideFromRightIOS}
        />
        <AppStack.Screen name="CREATE_POST_NAVIGATION" component={CreatePostNavigation} />
      </AppStack.Navigator>
    </Box>
  )
}
const useStyle = mkUseStyles((theme: Theme) => ({
  galleryScreenCard: {
    backgroundColor: theme.colors.modalBackground,
  },
}))
