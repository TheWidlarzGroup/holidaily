import React, { FC, ReactNode } from 'react'
import { FlexStyle, ActivityIndicator } from 'react-native'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'
import { Text, Box, mkUseStyles, Theme, useTheme } from 'utils/theme/index'
import IconGoogle from 'assets/icons/icon-google.svg'
import IconApple from 'assets/icons/icon-apple.svg'
import IconPlusSmall from 'assets/icons/icon-plus-small.svg'

type CustomButtonVariants = 'primary' | 'secondary' | 'alternative' | 'danger' | 'tertiary'
type CustomButtonIcons = 'google' | 'apple' | 'plus'

export interface CustomButtonProps extends RectButtonProperties, FlexStyle {
  label: string
  variant?: CustomButtonVariants
  icon?: CustomButtonIcons
  disabled?: boolean
  loading?: boolean
  onPress?: F0
  children?: ReactNode
  customStyle?: RectButtonProperties['style']
}

export const CustomButton: FC<CustomButtonProps> = ({
  variant = 'secondary',
  label,
  icon,
  disabled = false,
  loading = false,
  onPress,
  children,
  customStyle,
  ...rest
}) => {
  const styles = useStyles()
  const theme = useTheme()
  let bgColor
  let borderWidth = 0
  let color = theme.colors.black
  let rippleColor

  switch (variant) {
    case 'primary':
      bgColor = disabled ? theme.colors.primary : theme.colors.tertiary
      color = theme.colors.white
      rippleColor = theme.colors.disabled
      break
    case 'alternative':
      bgColor = disabled ? theme.colors.grey : theme.colors.black
      color = theme.colors.white
      rippleColor = theme.colors.blackBtnRippleColor
      break
    case 'secondary':
      bgColor = theme.colors.white
      color = theme.colors.black
      rippleColor = theme.colors.grey
      borderWidth = 1
      break
    case 'tertiary':
      bgColor = theme.colors.special
      color = theme.colors.white
      rippleColor = theme.colors.grey
      break
    case 'danger':
      bgColor = theme.colors.specialRed
      color = theme.colors.black
      rippleColor = theme.colors.disabled
      borderWidth = 2
      break
    default:
      break
  }

  return (
    <RectButton
      rippleColor={disabled ? bgColor : rippleColor}
      onPress={disabled ? () => null : onPress}
      activeOpacity={disabled ? 0 : 0.2}
      style={[
        styles.container,
        { backgroundColor: bgColor },
        customStyle,
        rest,
        variant === 'tertiary' && styles.smallBtn,
      ]}>
      <Box
        width="100%"
        height={variant === 'tertiary' ? 41 : 45}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderWidth={rest.borderWidth ?? borderWidth}
        borderColor={variant === 'secondary' && disabled ? 'grey' : 'black'}
        borderRadius="xxl">
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          children || (
            <>
              {icon === 'google' && <IconGoogle style={styles.icon} />}
              {icon === 'apple' && <IconApple style={styles.icon} />}
              {icon === 'plus' && <IconPlusSmall style={styles.icon} />}
              <Text
                variant={variant === 'tertiary' ? 'buttonSM' : 'buttonMD'}
                style={{ color: variant === 'secondary' && disabled ? rippleColor : color }}
                opacity={disabled && variant === 'primary' ? 0.8 : 1}>
                {label}
              </Text>
            </>
          )
        )}
      </Box>
    </RectButton>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    marginHorizontal: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: theme.borderRadii.l,
  },
  smallBtn: { borderRadius: theme.borderRadii.l2min },
  icon: {
    marginRight: theme.spacing.s,
  },
}))
