import React, { FC } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Box, mkUseStyles, Theme, theme } from 'utils/theme/index'
import IconPlus from 'assets/icons/icon-plus.svg'
import CircleBg from 'assets/circle-bg.svg'

type AddButtonProps = {
  onPress: () => void
}

export const AddButton: FC<AddButtonProps> = ({ onPress }) => {
  const styles = useStyles()
  return (
    <Box position="relative" alignItems="center">
      <RectButton style={styles.button} onPress={onPress} rippleColor={theme.colors.lightGrey}>
        <IconPlus />
      </RectButton>
      <Box position="absolute" bottom={-28}>
        <CircleBg />
      </Box>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  button: {
    backgroundColor: theme.colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 62,
    height: 62,
    borderRadius: theme.borderRadii.lplus,
    zIndex: theme.zIndices[2],
  },
}))
