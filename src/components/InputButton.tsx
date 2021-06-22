import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import BackArrowIcon from 'assets/icons/backArrow.svg'
import EditIcon from 'assets/icons/icon-edit-grey.svg'
import { Text, Box, mkUseStyles } from 'utils/theme/index'

type ButtonInputTypes = {
  inputLabel: string
  value: string
  onClick: F0
  isError?: boolean
  showEditIcon?: boolean
}

export const InputButton = ({
  inputLabel,
  value,
  isError = false,
  onClick,
  showEditIcon = false,
}: ButtonInputTypes) => {
  const styles = useStyles()

  const errorOpacity = useSharedValue(0)
  const progressStyle = useAnimatedStyle(() => ({
    borderWidth: withTiming(errorOpacity.value, {
      duration: 300,
    }),
  }))

  useEffect(() => {
    errorOpacity.value = isError ? 2 : 0
  }, [isError, errorOpacity])

  return (
    <TouchableOpacity onPress={onClick} activeOpacity={0.2}>
      <Text variant="label1" marginLeft="m" marginBottom="xs">
        {inputLabel}
      </Text>
      <Box flexDirection="row">
        <Animated.View style={[styles.input, styles.errorBorder, progressStyle]}>
          <Text variant="body1Bold" textAlign="left">
            {value}
          </Text>
        </Animated.View>
        <Box alignSelf="center" position="absolute" right={0}>
          <Box style={styles.button} padding={showEditIcon ? 'xs' : 'm'}>
            {showEditIcon ? (
              <EditIcon />
            ) : (
              <BackArrowIcon width={16} height={16} style={styles.icon} />
            )}
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

const useStyles = mkUseStyles((theme) => ({
  input: {
    flex: 1,
    height: 50,
    backgroundColor: theme.colors.lightGrey,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
    position: 'relative',
    justifyContent: 'center',
  },

  errorBorder: {
    borderStyle: 'solid',
    borderColor: theme.colors.errorRed,
  },
  border: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.colors.black,
  },
  button: {
    borderWidth: 4,
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: theme.borderRadii.xl,
    left: 0,
  },
  icon: {
    transform: [{ rotate: '180deg' }],
  },
}))
