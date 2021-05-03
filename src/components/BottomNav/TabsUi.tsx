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

  return (
    <Box>
      <Box
        width={windowWidth}
        position="absolute"
        right={0}
        left={0}
        bottom={0}
        backgroundColor="transparent">
        <Box backgroundColor="white" flexDirection="column">
          <TabsHandler {...{ tabs, tabWidth }} activeTabIndex={state.index} />
          <NavigationDot width={tabWidth} activeTabIndex={state.index} />
        </Box>
      </Box>
    </Box>
  )
}
