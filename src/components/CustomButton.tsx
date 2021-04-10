import React, { FC } from 'react'
import { FlexStyle, ActivityIndicator, StyleSheet } from 'react-native'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'
import { Text, Box, theme } from '../utils/theme/index'
import { colors } from '../utils/theme/colors'

import IconGoogle from '../assets/icons/icon-google.svg'
import IconSlack from '../assets/icons/icon-slack.svg'

type CustomButtonVariants = 'primary' | 'secondary' | 'special'
type CustomButtonIcons = 'google' | 'slack'

interface CustomButtonProps extends RectButtonProperties, FlexStyle {
  label: string
  variant?: CustomButtonVariants
  icon?: CustomButtonIcons
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
}

export const CustomButton: FC<CustomButtonProps> = ({
  variant = 'secondary',
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
    case 'secondary':
      color = colors.black
      break
    case 'special':
      bgColor = colors.black
      color = colors.white
      borderWidth = 0
      break
    case 'primary':
      bgColor = colors.tertiary
      color = colors.white
      borderWidth = 0
      break
    default:
      break
  }

  const backgroundColor = disabled ? colors.disabled : bgColor
  const textColor = disabled ? colors.disabledText : color

  return (
    <RectButton
      onPress={disabled ? () => null : onPress}
      activeOpacity={disabled ? 0 : 0.2}
      style={[styles.container, { backgroundColor }, rest]}>
      <Box
        paddingVertical="xm"
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderWidth={borderWidth}
        borderColor={disabled ? 'disabled' : 'black'}
        borderRadius="xxl">
        {loading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <>
            {icon === 'google' && <IconGoogle style={styles.icon} />}
            {icon === 'slack' && <IconSlack style={styles.icon} />}
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
    marginHorizontal: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: theme.borderRadii.l,
  },
  icon: {
    marginRight: theme.spacing.l,
  },
})
