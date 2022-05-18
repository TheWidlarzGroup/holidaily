import React, { FC, useMemo } from 'react'
import { NavigationState } from '@react-navigation/native'
import { isSmallScreen, windowWidth } from 'utils/deviceSizes'
import { Box } from 'utils/theme'
import { useRouteContext } from 'hooks/useRouteContext'
import { TabsHandler } from './TabsHandler'
import { NavigationDot } from './NavigationDot'

type TabsUiProps = {
  tabs: {
    name: string
  }[]
  state: NavigationState
}

const MIN_PLUS_ICON_WIDTH = 80

export const TabsUi: FC<TabsUiProps> = ({ tabs, state }) => {
  const { currentRoute } = useRouteContext()
  const withoutTabBar = 'DashboardNotifications'

  const tabWidth = useMemo(() => {
    if (isSmallScreen) {
      return (windowWidth - MIN_PLUS_ICON_WIDTH) / (tabs.length - 1)
    }
    return windowWidth / tabs.length
  }, [tabs.length])

  return (
    <Box visible={currentRoute !== withoutTabBar}>
      <Box position="absolute" bottom={-5} backgroundColor="transparent">
        <Box>
          <TabsHandler
            {...{ tabs, tabWidth }}
            activeTabIndex={state.index}
            minIconWidth={MIN_PLUS_ICON_WIDTH}
          />
          <NavigationDot
            width={tabWidth}
            activeTabIndex={state.index}
            minIconWidth={MIN_PLUS_ICON_WIDTH}
          />
        </Box>
      </Box>
    </Box>
  )
}
