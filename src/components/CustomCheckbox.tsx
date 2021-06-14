import React, { forwardRef, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, TextInputProps, Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import IconTogglePasswordVisibility from 'assets/icons/icon-togglePassword.svg'
import { Text, Box, theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'
import { useBooleanState } from 'hooks/useBooleanState'

type CheckboxProps = {
  checked: boolean
  onClick: () => void
}

export const Checkbox = ({ checked, onClick }: CheckboxProps) => {
  return (
    <Pressable onPress={onClick} style={[styles.container, checked && styles.containerChecked]}>
      <Box style={[styles.dot, checked && styles.dotChecked]}></Box>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.lightGrey,
    height: 32,
    width: 56,
    borderRadius: theme.borderRadii.l,
    position: 'relative',
  },
  containerChecked: {
    backgroundColor: theme.colors.primary,
  },
  dot: {
    position: 'absolute',
    left: -1,
    top: -1,
    backgroundColor: 'rgba(255, 140, 63, 0.596)',
    height: 34,
    width: 34,
    borderRadius: 32,
    borderColor: theme.colors.white,
    borderWidth: 3,
  },
  dotChecked: {
    left: 25,
    backgroundColor: theme.colors.secondary,
  },
})
