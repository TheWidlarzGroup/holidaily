import React from 'react'
import { Box } from 'utils/theme'
import { PolicySection } from './PolicySection'

export const Policies = () => (
  <Box padding="l" marginTop="l">
    <PolicySection textKey="policyOne" />
    <PolicySection textKey="policyTwo" />
  </Box>
)
