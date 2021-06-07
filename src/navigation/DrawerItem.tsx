import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import { Box, Text } from 'utils/theme'

type DrawerItemProps = {
  text: string
  onPress: () => void
  icon?: React.ReactNode | undefined
}

export const DrawerItem = ({ icon, text, onPress }: DrawerItemProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Box margin="m" flexDirection="row" alignItems="center">
      {icon}
      <Text marginLeft="m" style={{ fontFamily: 'Nunito-Bold', fontSize: 18 }}>
        {text}
      </Text>
    </Box>
  </TouchableWithoutFeedback>
)
