import React from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'

import { Box } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { getDrawerIcon, Tab } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerComponents/DrawerItem'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { DrawerHeader } from 'navigation/DrawerComponents/DrawerHeader'
import { useLogin } from 'hooks/useLogin'

export const CustomDrawerContent = ({ style, ...props }: DrawerContentComponentProps) => {
  const { t } = useTranslation('navigation')
  const { user } = useUserContext()
  const { handleLogout } = useLogin()

  return (
    <SafeAreaWrapper>
      <Animated.View style={[style, { flex: 1 }]}>
        <DrawerHeader firstName={user.firstName} lastName={user.lastName} job={user.role} />
        <Box flex={1} marginTop="xxl" alignItems="flex-start">
          {props.state.routes.map(
            ({ name, key }) =>
              name !== 'Home' && (
                <DrawerItem
                  icon={getDrawerIcon(name as Tab)}
                  text={props.descriptors[key].options.title}
                  onPress={() => {
                    props.navigation.navigate(name)
                  }}
                  key={name}
                />
              )
          )}
        </Box>
        <Box marginBottom="xxl" alignItems="flex-start">
          <DrawerItem text={t('logout')} icon={getDrawerIcon('Logout')} onPress={handleLogout} />
        </Box>
      </Animated.View>
    </SafeAreaWrapper>
  )
}
