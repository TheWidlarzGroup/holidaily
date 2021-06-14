import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import BackArrowIcon from 'assets/icons/backArrow.svg'
import { Text, Box, theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'

type ButtonInputTypes = {
  inputLabel: string
  value: string
  isError?: boolean
  onClick: () => void
}

export const InputButton = ({ inputLabel, value, isError = false, onClick }: ButtonInputTypes) => {
  const errorOpacity = useSharedValue(0)

  const progressStyle = useAnimatedStyle(() => ({
    borderWidth: withTiming(errorOpacity.value, {
      duration: 300,
    }),
  }))

  useEffect(() => {
    errorOpacity.value = isError ? 2 : 0
  }, [isError])

  return (
    <Box>
      <TouchableOpacity onPress={onClick}>
        <Text variant="label1" marginLeft="m" marginBottom="xs">
          {inputLabel}
        </Text>
        <Box flexDirection="row">
          <Animated.View style={[styles.input, styles.errorBorder, progressStyle]}>
            <Text variant="body1Bold" textAlign="left">
              {' '}
              {value}{' '}
            </Text>
          </Animated.View>
          <Box alignSelf="center" position="absolute" right={0}>
            <Box style={styles.button}>
              <BackArrowIcon width={16} height={16} style={styles.icon} />
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    backgroundColor: colors.lightGrey,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
    position: 'relative',
    justifyContent: 'center',
  },

  errorBorder: {
    borderStyle: 'solid',
    borderColor: colors.errorRed,
  },
  border: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.black,
  },
  button: {
    borderWidth: 4,
    borderColor: 'white',
    borderStyle: 'solid',
    padding: 17,
    borderRadius: theme.borderRadii.xl,
    left: 0,
  },
  icon: {
    transform: [{ rotate: '180deg' }],
  },
})
