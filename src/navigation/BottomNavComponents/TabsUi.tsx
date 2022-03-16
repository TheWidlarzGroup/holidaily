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
  const tabWidth = useMemo(() => windowWidth / tabs.length, [tabs.length])
  const isSmallScreen = windowWidth < 400

  return (
    <Box>
      <Box width={windowWidth} position="absolute" bottom={-5} backgroundColor="transparent">
        <Box>
          <TabsHandler {...{ tabs, tabWidth, isSmallScreen }} activeTabIndex={state.index} />
          <NavigationDot
            width={tabWidth}
            activeTabIndex={state.index}
            isSmallScreen={isSmallScreen}
            windowWidth={windowWidth}
          />
        </Box>
      </Box>
    </Box>
  )
}
