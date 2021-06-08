import React from 'react'
import { useTranslation } from 'react-i18next'
import Animated from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { theme } from 'utils/theme'
import { About } from 'screens/about/About'
import { Settings } from 'screens/settings/Settings'
import { Budget } from 'screens/budget/Budget'
import { EditProfile } from 'screens/editProfile/EditProfile'
import { CustomDrawerContent } from './CustomDrawerContent'
import { BottomTabNavigator as Home } from './BottomTabNavigator'

const Drawer = createDrawerNavigator()

let screenStyles = {}
let drawerStyles = {}

export const DrawerNavigator = () => {
  const { t } = useTranslation('navigation')
  const { width } = useDimensions()
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => {
        const screenScale = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        })
        const screenTranslate = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [0, 0.8 * width * -0.1],
        })
        const screenShadowAndroid = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [0, 10],
        })
        const screenShadowIOS = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [0, 1],
        })
        screenStyles = {
          transform: [{ scale: screenScale }, { translateX: screenTranslate }],
          shadowOffset: { width: 0, height: 0 },
          shadowColor: theme.colors.black,
          shadowOpacity: screenShadowIOS,
          elevation: screenShadowAndroid,
          borderWidth: 0,
          backgroundColor: '#0000',
        }
        const drawerScale = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [1.1, 1],
        })
        const drawerTranslate = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [0.1 * width, 1],
        })
        const drawerOpacity = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [0, 1],
        })
        drawerStyles = {
          transform: [{ scale: drawerScale }, { translateX: drawerTranslate }],
          opacity: drawerOpacity,
        }
        return <CustomDrawerContent {...props} style={drawerStyles} />
      }}
      overlayColor="transparent"
      drawerStyle={{ backgroundColor: 'transparent' }}
      drawerType="back">
      <Drawer.Screen name="Home" options={{ title: t('home') }}>
        {(props) => <Home style={screenStyles} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Edit profile"
        component={EditProfile}
        options={{ title: t('editProfile'), swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Holiday budget"
        component={Budget}
        options={{ title: t('budget'), swipeEnabled: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ title: t('settings'), swipeEnabled: false }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{ title: t('about'), swipeEnabled: false }}
      />
    </Drawer.Navigator>
  )
}
