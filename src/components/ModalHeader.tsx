import React from 'react'
import { Box } from 'utils/theme'

export const ModalHeader = ({ children }: { children: React.ReactNode }) => (
  <Box
    paddingTop="m"
    paddingBottom="m"
    bg="disabledText"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    borderBottomLeftRadius="lmin"
    borderBottomRightRadius="lmin">
    {children}
  </Box>
)
