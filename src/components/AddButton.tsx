import React, { FC } from 'react'
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native'

import { Box, theme } from 'utils/theme/index'
import IconPlus from 'assets/icons/icon-plus.svg'

type AddButtonProps = {
  onPress: () => void
}

export const AddButton: FC<AddButtonProps> = ({ onPress }) => (
  <Box position="relative" alignItems="center">
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <IconPlus />
    </TouchableOpacity>
  </Box>
)

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: -theme.spacing.xxl,
    backgroundColor: theme.colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 62,
    height: 62,
    borderRadius: theme.borderRadii.lplus,
  },
})
