import React from 'react'
import { DrawerContentComponentProps, useDrawerProgress } from '@react-navigation/drawer'
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Box } from 'utils/theme'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { DrawerIcon, Tab } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerComponents/DrawerItem'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerHeader } from 'navigation/DrawerComponents/DrawerHeader'
import { DrawerRoutes } from 'navigation/types'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { Logout } from './Logout'

const AnimatedBox = Animated.createAnimatedComponent(Box)

export const CustomDrawerContent = ({ ...props }: DrawerContentComponentProps) => {
  const { user } = useUserContext()
  const progress = useDrawerProgress() as Readonly<SharedValue<number>>
  const { width } = useDimensions()

  const style = useAnimatedStyle(() => {
    const drawerScale = interpolate(progress.value, [0, 1], [1.1, 1])
    const drawerTranslate = interpolate(progress.value, [0, 1], [0.1 * width, 1])
    const drawerOpacity = interpolate(progress.value, [0, 1], [0, 2])

    return {
      transform: [{ scale: drawerScale }, { translateX: drawerTranslate }],
      opacity: drawerOpacity,
    }
  })

  if (!user) return null

  const isHidden = (name: keyof DrawerRoutes) => {
    const isHome = name === 'Home'
    const isAdminPanelEmployees =
      name === 'AdminPanelEmployeesNavigation' && user.role !== 'Admin' && user.role !== 'MANAGER'

    return !(isHome || isAdminPanelEmployees)
  }

  return (
    <SafeAreaWrapper>
      <AnimatedBox flex={1} backgroundColor="white" style={style}>
        <DrawerHeader
          firstName={user.firstName}
          lastName={user.lastName}
          occupation={user.occupation}
        />
        <Box flex={1} marginTop="xxl" alignItems="flex-start">
          {props.state.routes.map(
            ({ name, key }) =>
              isHidden(name as keyof DrawerRoutes) && (
                <DrawerItem
                  icon={DrawerIcon(name as Tab)}
                  text={props.descriptors[key].options.title}
                  onPress={() => {
                    props.navigation.navigate(name)
                  }}
                  key={name}
                />
              )
          )}
        </Box>
        <Logout />
      </AnimatedBox>
    </SafeAreaWrapper>
  )
}
