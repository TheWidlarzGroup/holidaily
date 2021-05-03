import React, { FC, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { AddButton } from 'components/AddButton'
import { Box, theme } from 'utils/theme'
import { getBottomTabIcon } from 'utils/getBottomTabIcon'
import { BottomTabNavigationType } from 'navigation/types'

type TabsHandlerProps = {
  tabs: any
  tabWidth: number
  activeTabIndex: number
}

export const TabsHandler: FC<TabsHandlerProps> = ({ tabs, tabWidth, activeTabIndex }) => {
  const [activeTab, setActiveTab] = useState('')
  const navigation = useNavigation<BottomTabNavigationType<any>>()

  useEffect(() => {
    setActiveTab(tabs[activeTabIndex].name)
  }, [activeTabIndex])
  return (
    <Box flexDirection="row">
      {tabs.map((tab: any, key: number) => {
        const onPress = () => {
          if (tab.name === 'RequestModal') {
            navigation.navigate('RequestVacation')
          } else {
            navigation.navigate(tab.name)
          }
        }
        if (tab.name === 'RequestModal') {
          return (
            <Box
              key="logo"
              width={tabWidth}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height={40}>
              <AddButton onPress={onPress} />
            </Box>
          )
        }

        return (
          <TouchableOpacity {...{ key }} onPress={onPress}>
            <Box
              width={tabWidth}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height={40}>
              {getBottomTabIcon(
                tab.name,
                activeTab,
                theme.colors.black,
                theme.colors.bottomBarIcons
              )}
            </Box>
          </TouchableOpacity>
        )
      })}
    </Box>
  )
}
