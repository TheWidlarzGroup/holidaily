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

export const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
  const { handleUserDataChange } = useUserContext()

  const handleLogout = () => {
    handleUserDataChange(null)
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
