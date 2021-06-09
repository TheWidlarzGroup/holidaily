import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'

import { Box, Text } from 'utils/theme'
import { useUserContext } from 'hooks/useUserContext'
import { emptyUser } from 'contexts/UserProvider'
import { getDrawerIcon } from 'utils/getDrawerIcon'
import { DrawerItem } from 'navigation/DrawerItem'
import { MOCK_DATA } from 'navigation/MockData'
import UserIconPlaceholder from 'assets/icons/icon-profile.svg'

const imageSize = 44

export const CustomDrawerContent = ({ style, ...props }: DrawerContentComponentProps) => {
  const { t } = useTranslation('navigation')
  const { updateUser } = useUserContext()

  const handleLogout = () => {
    updateUser(emptyUser)
  }
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <Animated.View style={[style, { flex: 1 }]}>
        <Box flex={1}>
          <Box margin="m">
            {MOCK_DATA.profilePicture ? (
              <Image
                source={{ uri: MOCK_DATA.profilePicture }}
                style={{ width: imageSize, height: imageSize, borderRadius: imageSize / 2 }}
              />
            ) : (
              <UserIconPlaceholder width={imageSize} height={imageSize} />
            )}
            <Text marginTop="m" variant="boldBlack18">
              {MOCK_DATA.firstName} {MOCK_DATA.lastName}
            </Text>
            <Text variant="regularGrey16">{MOCK_DATA.job}</Text>
          </Box>
          <Box marginTop="xxl">
            {props.state.routes.map(
              ({name, key}) =>
                name !== 'Home' && (
                  <DrawerItem
                    icon={getDrawerIcon(name)}
                    text={props.descriptors.[key].options.title}
                    onPress={() => {
                      props.navigation.navigate(name)
                    }}
                    key={name}
                  />
                )
            )}
          </Box>
        </Box>

        <Box marginBottom="xxl">
          <DrawerItem text={t('logout')} icon={getDrawerIcon('Logout')} onPress={handleLogout} />
        </Box>
      </Animated.View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
})
