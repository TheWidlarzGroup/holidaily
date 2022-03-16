import React, { FC, useMemo } from 'react'
import { Dimensions } from 'react-native'
import { NavigationState } from '@react-navigation/native'
import { Box } from 'utils/theme'
import { NavigationDot } from './NavigationDot'
import { TabsHandler } from './TabsHandler'

type TabsUiProps = {
  tabs: {
    name: string
  }[]
  state: NavigationState
}
const { width: windowWidth } = Dimensions.get('window')

export const TabsUi: FC<TabsUiProps> = ({ tabs, state }) => {
  const isSmallScreen = windowWidth < 400
  const minPlusIconWidth = 80
  const tabWidth = useMemo(() => {
    if (isSmallScreen) {
      return (windowWidth - minPlusIconWidth) / (tabs.length - 1)
    }
    return windowWidth / tabs.length
  }, [isSmallScreen, tabs.length])

  return (
    <Box>
      <Box width={windowWidth} position="absolute" bottom={-5} backgroundColor="transparent">
        <Box>
          <TabsHandler {...{ tabs, tabWidth, minPlusIconWidth }} activeTabIndex={state.index} />
          <NavigationDot
            width={tabWidth}
            activeTabIndex={state.index}
            isSmallScreen={isSmallScreen}
            minPlusIconWidth={minPlusIconWidth}
          />
        </Box>
      </Box>
    </Box>
  )
}
