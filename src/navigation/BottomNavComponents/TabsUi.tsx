import React, { FC } from 'react'
import { NavigationState } from '@react-navigation/native'
import { windowWidth } from 'utils/deviceSizes'
import { ADD_BTN_WIDTH } from 'components/AddButton'
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
  const tabWidth = (windowWidth - ADD_BTN_WIDTH) / (tabs.length - 1)

  return (
    <Box position="absolute" bottom={-5} width={windowWidth}>
      <TabsHandler
        {...{ tabs, tabWidth }}
        activeTabIndex={state.index}
        minIconWidth={ADD_BTN_WIDTH}
      />
      <NavigationDot width={tabWidth} activeTabIndex={state.index} minIconWidth={ADD_BTN_WIDTH} />
    </Box>
  )
}
