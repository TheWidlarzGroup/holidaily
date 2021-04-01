import React, { FC } from 'react'
import { FlexStyle, ActivityIndicator, StyleSheet } from 'react-native'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'
import { Text } from '../utils/theme/index'

import { IconGoogle } from './icons/IconGoogle'
import { IconSlack } from './icons/IconSlack'

interface CustomButtonProps extends RectButtonProperties, FlexStyle {
  label: string
  textColor: 'white' | 'black'
  backgroundColor?: 'black' | '#FF9F2D'
  onPress?: () => void
  icon?: 'google' | 'slack'
  disabled?: boolean
  loading?: boolean
}

export const CustomButton: FC<CustomButtonProps> = ({
  label,
  textColor,
  backgroundColor,
  icon,
  disabled = false,
  loading = false,
  onPress,
  ...rest
}) => {
  const rippleColor = disabled ? undefined : 'rgba(0,0,0,0.2)'

  return (
    <RectButton
      onPress={disabled ? () => null : onPress}
      activeOpacity={disabled ? 0 : 0.2}
      rippleColor={rippleColor}
      style={[
        styles.container,
        backgroundColor && { backgroundColor, borderColor: backgroundColor },
        rest,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {icon === 'google' && <IconGoogle />}
          {icon === 'slack' && <IconSlack />}
          <Text variant="buttonText1" color={textColor}>
            {label}
          </Text>
        </>
      )}
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
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
})
