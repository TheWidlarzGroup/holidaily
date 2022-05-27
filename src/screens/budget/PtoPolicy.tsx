import React from 'react'
import { SwipeableScreen } from 'navigation/SwipeableScreen'
import { Policies } from './components/Policies'
import { PolicyHeader } from './components/PolicyHeader'

export const PtoPolicy = () => (
  <SwipeableScreen>
    <PolicyHeader />
    <Policies />
  </SwipeableScreen>
)
