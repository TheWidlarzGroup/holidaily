import React from 'react'
import { Box } from 'utils/theme'

export const ModalHeader = ({
  children,
  noPadding,
}: {
  children: React.ReactNode
  noPadding?: true
}) => (
  <Box
    paddingBottom={noPadding ? undefined : 'lplus'}
    bg="disabledText"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    borderBottomEndRadius="lmin">
    {children}
  </Box>
)
