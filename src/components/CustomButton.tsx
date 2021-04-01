import React, { FC } from 'react'
import { FlexStyle, ActivityIndicator, StyleSheet } from 'react-native'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'
import { Text, Box, theme } from '../utils/theme/index'
import { colors } from '../utils/theme/colors'

import IconGoogle from '../assets/icons/icon-google.svg'
import IconSlack from '../assets/icons/icon-slack.svg'

type CustomButtonVariants = 'transparent' | 'black' | 'orange'
type CustomButtonIcons = 'google' | 'slack'

interface CustomButtonProps extends RectButtonProperties, FlexStyle {
  variant?: CustomButtonVariants
  icon?: CustomButtonIcons
  label: string
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
}

export const CustomButton: FC<CustomButtonProps> = ({
  variant = 'transparent',
  label,
  icon,
  disabled = false,
  loading = false,
  onPress,
  ...rest
}) => {
  let bgColor
  let borderWidth = 2
  let color = colors.black

  switch (variant) {
    case 'transparent':
      color = colors.black
      break
    case 'black':
      bgColor = colors.black
      color = colors.white
      borderWidth = 0
      break
    case 'orange':
      bgColor = colors.secondary
      color = colors.white
      borderWidth = 0
      break
    default:
      break
  }

  const backgroundColor = disabled ? colors.disabled : bgColor
  const textColor = disabled ? colors.white : color
  const rippleColor = disabled ? 'rgba(0,0,0,0)' : colors.tertiary

  return (
    <RectButton
      onPress={disabled ? () => null : onPress}
      activeOpacity={disabled ? 0 : 0.2}
      rippleColor={rippleColor}
      style={[styles.container, { backgroundColor }, rest]}>
      <Box
        height="100%"
        width="100%"
        flexDirection="row"
        alignSelf="center"
        alignItems="center"
        justifyContent="space-evenly"
        borderWidth={borderWidth}
        borderRadius="xxl"
        borderColor="black">
        {loading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <>
            {icon === 'google' && <IconGoogle />}
            {icon === 'slack' && <IconSlack />}
            <Text variant="buttonText1" style={{ color: textColor }}>
              {label}
            </Text>
          </>
        )}
      </Box>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 275,
    height: 53,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: theme.borderRadii.xxl,
  },
})
