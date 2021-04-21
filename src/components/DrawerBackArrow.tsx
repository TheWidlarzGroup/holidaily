import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'

import { Box, Text } from 'utils/theme'

type DrawerBackArrowProps = {
  goBack: () => void
}

export const DrawerBackArrow: FC<DrawerBackArrowProps> = ({ goBack }) => (
  <Box marginLeft="l">
    <TouchableOpacity onPress={goBack}>
      <Text>Go Back</Text>
    </TouchableOpacity>
  </Box>
)
