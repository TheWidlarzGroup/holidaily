import React from 'react'
import { ModalProps } from 'react-native-modal'

import { mkUseStyles, Theme, Box, Text } from 'utils/theme'
import { CustomButton } from 'components/CustomButton'
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'

type RequestSentProps = Pick<ModalProps, 'isVisible'> & {
  onPressSee: F0
  onPressAnother: F0
  onPressOk: F0
}

export const RequestSent = ({
  isVisible,
  onPressSee,
  onPressAnother,
  onPressOk,
}: RequestSentProps) => {
  const styles = useStyles()

  const { height } = useDimensions()
  const progress = useDerivedValue(() => (isVisible ? 1 : 0), [isVisible])

  const animatedModalStyles = useAnimatedStyle(() => {
    const v = progress.value
    const h = height
    return {
      transform: [{ translateY: withSpring((1 - v) * h, { overshootClamping: true }) }],
      opacity: withSpring(v, { overshootClamping: true }),
    }
  }, [])

  if (!isVisible) return null

  return (
    <Animated.View style={[styles.modal, animatedModalStyles]}>
      <Box
        alignItems="center"
        paddingHorizontal="xxl"
        flex={1}
        paddingBottom="xl"
        justifyContent="flex-end">
        <Text variant="heading4" marginBottom="xxl">
          Request sent!
        </Text>
        <Text variant="body1" marginBottom="l">
          Now wait for the request approval, and do not pack your suitcase yet!
        </Text>
        <Text variant="body1">You will find all requests at the bottom of the screen.</Text>
        <Box marginTop="xl">
          <Box style={styles.button}>
            <CustomButton label="See request" onPress={onPressSee} />
          </Box>
          <Box style={styles.button}>
            <CustomButton label="Add another request" onPress={onPressAnother} />
          </Box>
          <Box style={styles.button}>
            <CustomButton label="Ok, cool!" variant="blackBgButton" onPress={onPressOk} />
          </Box>
        </Box>
      </Box>
    </Animated.View>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  modal: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: -5,
    borderTopLeftRadius: theme.borderRadii.lmin,
    borderTopRightRadius: theme.borderRadii.lmin,
    shadowOffset: { width: -2, height: 0 },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 20,
  },
  button: {
    marginVertical: 5,
  },
}))
