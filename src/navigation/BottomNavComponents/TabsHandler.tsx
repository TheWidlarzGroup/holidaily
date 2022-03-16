import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AddButton } from 'components/AddButton'
import { Box, theme } from 'utils/theme'
import { getBottomTabIcon } from 'utils/getBottomTabIcon'
import { ModalNavigationType } from 'navigation/types'
import { BorderlessButton } from 'react-native-gesture-handler'

type TabsHandlerProps = {
  tabs: {
    name: string
  }[]
  tabWidth: number
  isSmallScreen: boolean
  activeTabIndex: number
}

export const TabsHandler: FC<TabsHandlerProps> = ({
  tabs,
  tabWidth,
  activeTabIndex,
  isSmallScreen,
}) => {
  const navigation = useNavigation<ModalNavigationType<'DrawerNavigator'>>()
  const minPlusIconWidth = 80

  return (
    <Box flexDirection="row" flex={1}>
      {tabs.map((tab, key: number) => {
        const onPress = () => {
          if (tab.name === 'RequestModal') {
            navigation.navigate('RequestVacation')
          } else {
            navigation.navigate(tab.name as never)
          }
        }
        if (tab.name === 'RequestModal') {
          return (
            <Box
              key="logo"
              width={tabWidth}
              backgroundColor="transparent"
              minWidth={isSmallScreen ? minPlusIconWidth : undefined}>
              <AddButton onPress={onPress} />
            </Box>
          )
        }

        return (
          <Box
            {...{ key }}
            height={45}
            width={tabWidth}
            flex={isSmallScreen ? 1 : undefined}
            marginTop="lplus"
            alignItems="center"
            flexDirection="column"
            backgroundColor="white"
            zIndex="5">
            <BorderlessButton onPress={onPress} style={styles.button}>
              {getBottomTabIcon(
                tab.name,
                tabs[activeTabIndex].name,
                theme.colors.black,
                theme.colors.bottomBarIcons
              )}
            </BorderlessButton>
          </Box>
        )
      })}
    </Box>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingTop: theme.spacing.xm,
    paddingBottom: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
  },
})
