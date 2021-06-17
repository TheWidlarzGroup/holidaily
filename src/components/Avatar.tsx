import React from 'react'
import IconProfile from 'assets/icons/icon-profile.svg'
import { Box, mkUseStyles, Theme } from 'utils/theme'
import { themeBase } from 'utils/theme/themeBase'
import FastImage from 'react-native-fast-image'

const sizes = themeBase.avatarSize

type AvatarProps = {
  src?: string
  size?: keyof typeof sizes | number
}

export const Avatar = ({ size = 'm', src, ...containerProps }: AvatarProps) => {
  const chosenSize = typeof size === 'number' ? size : sizes[size] ?? sizes.m
  const width = chosenSize
  const height = chosenSize

  const styles = useStyles()

  return (
    <Box style={[styles.container, { width, height }]} {...containerProps}>
      {src ? (
        <FastImage style={{ minWidth: width, minHeight: height }} source={{ uri: src }} />
      ) : (
        <IconProfile width={width} height={height} />
      )}
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    overflow: 'hidden',
    borderRadius: theme.borderRadii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
