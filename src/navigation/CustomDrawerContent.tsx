import React, { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer'

import { Box, Text, theme } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { emptyUser } from 'contexts/UserProvider'
import { getDrawerIcon } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerItem'
import UserIconPlaceholder from 'assets/icons/icon-profile.svg'
import { MOCK_DATA } from 'navigation/MockData'

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { updateUser } = useUserContext()

  const handleLogout = () => {
    updateUser(emptyUser)
  }
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <Box>
        <Box margin="m">
          {MOCK_DATA.profilePicture ? (
            <Image
              source={{ uri: MOCK_DATA.profilePicture }}
              style={{ width: 44, height: 44, borderRadius: 22 }}
            />
          ) : (
            <UserIconPlaceholder width={44} height={44} />
          )}

          <Text marginTop="m" style={styles.header}>
            {MOCK_DATA.firstName} {MOCK_DATA.lastName}
          </Text>
          <Text style={styles.subHeader}>{MOCK_DATA.job}</Text>
        </Box>
        <Box marginTop="xxl">
          {props.state.routes.map(
            (route) =>
              route.name !== 'Home' && (
                <DrawerItem
                  icon={getDrawerIcon(route.name)}
                  text={route.name}
                  onPress={() => {
                    props.navigation.navigate(route.name)
                  }}
                  key={route.name}
                />
              )
          )}
        </Box>
      </Box>

      <Box marginBottom="xxl">
        <DrawerItem text="Log out" icon={getDrawerIcon('Logout')} onPress={handleLogout} />
      </Box>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  header: { fontFamily: 'Nunito-Bold', color: theme.colors.black, fontSize: 18 },
  subHeader: { fontFamily: 'Nunito-Regular', color: theme.colors.grey, fontSize: 16 },
})
