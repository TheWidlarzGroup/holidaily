import React from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import Animated from 'react-native-reanimated'
import { Box, mkUseStyles } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { DrawerIcon, Tab } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerComponents/DrawerItem'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerHeader } from 'navigation/DrawerComponents/DrawerHeader'
import { DrawerRoutes } from 'navigation/types'
import { Logout } from './Logout'

export const CustomDrawerContent = ({ style, ...props }: DrawerContentComponentProps) => {
  const { user } = useUserContext()
  const styles = useStyles()

  if (!user) return null

  const isHidden = (name: keyof DrawerRoutes) => {
    const isHome = name === 'Home'
    const isAdminPanelEmployees =
      name === 'AdminPanelEmployeesNavigation' && user.role !== 'Admin' && user.role !== 'MANAGER'

    if (isHome || isAdminPanelEmployees) return false
    return true
  }

  return (
    <SafeAreaWrapper>
      <Animated.View
        style={[style, { flex: 1, backgroundColor: styles.container.backgroundColor }]}>
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
      </Animated.View>
    </SafeAreaWrapper>
  )
}

const useStyles = mkUseStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.dashboardBackground,
  },
}))
