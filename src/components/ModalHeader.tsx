import React, { ReactNode } from 'react'
import { Box } from 'utils/theme'

export const ModalHeader = ({ children }: { children: ReactNode }) => (
  <Box
    bg="veryLightGrey"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    borderBottomLeftRadius="lmin"
    borderBottomRightRadius="lmin">
    {children}
  </Box>
)
