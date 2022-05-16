import React from 'react'
import { mkUseStyles, Theme } from 'utils/theme'
import FastImage from 'react-native-fast-image'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { Policies } from './components/Policies'
import { PolicyHeader } from './components/PolicyHeader'

const Background = require('assets/policy_modal_background.png')

export const PtoPolicy = () => {
  const styles = useStyles()
  return (
    <SwipeableScreen>
      <PolicyHeader />
      <Policies />
      <FastImage style={[styles.background]} source={Background} />
    </SwipeableScreen>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  background: {
    flex: 1,
    overflow: 'visible',
    zIndex: theme.zIndices['-1'],
  },
}))
