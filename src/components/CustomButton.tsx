import React, { FC, ReactNode } from 'react'
import { FlexStyle, ActivityIndicator } from 'react-native'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'
import { Text, Box, mkUseStyles, Theme } from 'utils/theme/index'
import { colors } from 'utils/theme/colors'

import IconGoogle from 'assets/icons/icon-google.svg'
import IconApple from 'assets/icons/icon-apple.svg'
import IconPlusSmall from 'assets/icons/icon-plus-small.svg'

type CustomButtonVariants = 'primary' | 'secondary' | 'blackBgButton'
type CustomButtonIcons = 'google' | 'apple' | 'plus'

export interface CustomButtonProps extends RectButtonProperties, FlexStyle {
  label: string
  variant?: CustomButtonVariants
  icon?: CustomButtonIcons
  disabled?: boolean
  loading?: boolean
  onPress?: F0
  children?: ReactNode
}

export const CustomButton: FC<CustomButtonProps> = ({
  variant = 'secondary',
  label,
  icon,
  disabled = false,
  loading = false,
  onPress,
  children,
  ...rest
}) => {
  const styles = useStyles()
  let bgColor
  let borderWidth = 2
  let color = colors.black
  let rippleColor

  switch (variant) {
    case 'secondary':
      color = colors.black
      rippleColor = colors.disabled
      break
    case 'blackBgButton':
      bgColor = colors.black
      color = colors.white
      rippleColor = colors.blackBtnRippleColor
      borderWidth = 0
      break
    case 'primary':
      bgColor = colors.tertiary
      color = colors.white
      rippleColor = colors.disabled
      borderWidth = 0
      break
    default:
      break
  }

  const backgroundColor = disabled ? colors.disabled : bgColor
  const textColor = disabled ? colors.disabledText : color

  return (
    <RectButton
      rippleColor={rippleColor}
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
          children || (
            <>
              {icon === 'google' && <IconGoogle style={styles.icon} />}
              {icon === 'apple' && <IconApple style={styles.icon} />}
              {icon === 'plus' && <IconPlusSmall style={styles.icon} />}
              <Text variant="buttonText1" style={{ color: textColor }}>
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
  icon: {
    marginRight: theme.spacing.s,
  },
}))
