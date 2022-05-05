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
  activeTabIndex: number
  minIconWidth: number
}

export const TabsHandler: FC<TabsHandlerProps> = ({
  tabs,
  tabWidth,
  activeTabIndex,
  minIconWidth,
}) => {
  const navigation = useNavigation<ModalNavigationType<'DrawerNavigator'>>()

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
            <Box key="logo" width={tabWidth} backgroundColor="transparent" minWidth={minIconWidth}>
              <AddButton onPress={onPress} />
            </Box>
          )
        }

        return (
          <Box
            {...{ key }}
            height={40}
            width={tabWidth}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.s,
    paddingBottom: theme.spacing.s,
  },
})
