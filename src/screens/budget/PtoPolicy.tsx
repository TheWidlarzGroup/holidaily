import React from 'react'
import { mkUseStyles, Theme } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { SwipableScreen } from 'navigation/SwipeableScreen'
import { Policies } from './components/Policies'
import { PolicyHeader } from './components/PolicyHeader'

const Background = require('assets/policy_modal_background.png')

export const PtoPolicy = () => {
  const styles = useStyles()
  return (
    <SwipableScreen>
      <PolicyHeader />
      <Policies />
      <FastImage style={[styles.background]} source={Background} />
    </SwipableScreen>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  background: {
    flex: 1,
    overflow: 'visible',
    zIndex: theme.zIndices['-1'],
  },
}))
