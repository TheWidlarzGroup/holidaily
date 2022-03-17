import React, { FC, useMemo } from 'react'
import { NavigationState } from '@react-navigation/native'
import { isSmallScreen, windowWidth } from 'utils/deviceSizes'
import { MIN_PLUS_ICON_WIDTH } from 'navigation/BottomTabNavigator'
import { Box } from 'utils/theme'
import { TabsHandler } from './TabsHandler'
import { NavigationDot } from './NavigationDot'

type TabsUiProps = {
  tabs: {
    name: string
  }[]
  state: NavigationState
}

export const TabsUi: FC<TabsUiProps> = ({ tabs, state }) => {
  const tabWidth = useMemo(() => {
    if (isSmallScreen) {
      return (windowWidth - MIN_PLUS_ICON_WIDTH) / (tabs.length - 1)
    }
    return windowWidth / tabs.length
  }, [tabs.length])

  return (
    <Box>
      <Box width={windowWidth} position="absolute" bottom={-5} backgroundColor="transparent">
        <Box>
          <TabsHandler {...{ tabs, tabWidth }} activeTabIndex={state.index} />
          <NavigationDot width={tabWidth} activeTabIndex={state.index} />
        </Box>
      </Box>
    </Box>
  )
}
