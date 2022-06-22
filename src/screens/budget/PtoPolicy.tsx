import React from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { Policies } from './components/Policies'
import { PolicyHeader } from './components/PolicyHeader'

export const PtoPolicy = () => (
  <SafeAreaWrapper>
    <PolicyHeader />
    <Policies />
  </SafeAreaWrapper>
)
