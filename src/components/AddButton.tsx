import React, { FC } from 'react'

import { Box, Text, theme } from 'utils/theme/index'

export const AddButton: FC = () => (
  <Box
    backgroundColor="addButtonBackground"
    justifyContent="center"
    alignItems="center"
    bottom={theme.spacing.m}
    width={62}
    height={62}
    borderRadius="lplus">
    <Text textAlign="center" color="bottomBarIcons" fontSize={52}>
      +
    </Text>
  </Box>
)
