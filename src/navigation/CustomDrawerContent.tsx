import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'

import { CustomButton } from 'components/CustomButton'
import { Box } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { emptyUser } from 'contexts/UserProvider'

export const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
  const { updateUser } = useUserContext()

  const handleLogout = () => {
    updateUser(emptyUser)
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <Box>
        <DrawerItemList {...props} />
      </Box>

      <Box marginBottom="l">
        <CustomButton label="Logout" variant="primary" onPress={handleLogout} />
      </Box>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
})
