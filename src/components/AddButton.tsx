import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { Box, theme } from 'utils/theme/index'
import IconPlus from 'assets/icons/icon-plus.svg'
import CircleBg from 'assets/circle-bg.svg'

type AddButtonProps = {
  onPress: () => void
}

export const AddButton: FC<AddButtonProps> = ({ onPress }) => (
  <Box position="relative" alignItems="center">
    <RectButton style={styles.button} onPress={onPress} rippleColor={theme.colors.lightGrey}>
      <IconPlus />
    </RectButton>
    <Box position="absolute" bottom={-28}>
      <CircleBg />
    </Box>
  </Box>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 62,
    height: 62,
    borderRadius: theme.borderRadii.lplus,
    zIndex: 2,
  },
})
