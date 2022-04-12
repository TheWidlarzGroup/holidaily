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
    paddingTop="l"
    paddingBottom={noPadding ? undefined : 'lplus'}
    bg="disabledText"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    borderBottomLeftRadius="lmin"
    borderBottomRightRadius="lmin">
    {children}
  </Box>
)
