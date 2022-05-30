import React from 'react'
import { Pressable } from 'react-native'
import { mkUseStyles, Theme, useTheme, Text } from 'utils/theme'
import CrossIcon from 'assets/icons/icon-close.svg'

type ButtonType = {
  onPress: F0
  teamName: string
  isSelected: boolean
}

export const TertiaryButton = (p: ButtonType) => {
  const styles = useStyles()
  const theme = useTheme()
  const bgColor = p.isSelected ? theme.colors.special : theme.colors.white

  return (
    <Pressable
      style={[styles.team, { backgroundColor: bgColor }]}
      android_ripple={{
        color: theme.colors.alwaysWhite,
        foreground: true,
      }}
      onPress={p.onPress}>
      <Text
        variant="textBoldSM"
        color={p.isSelected ? 'alwaysWhite' : 'special'}
        marginRight={p.isSelected ? 's' : 'none'}>
        {p.teamName}
      </Text>
      {p.isSelected && <CrossIcon height={12} color={theme.colors.alwaysWhite} />}
    </Pressable>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  team: {
    height: 37,
    borderWidth: 1.2,
    borderColor: theme.colors.special,
    marginBottom: theme.spacing.s,
    marginRight: theme.spacing.s,
    paddingHorizontal: theme.spacing.ml,
    borderRadius: theme.borderRadii.xxl,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
