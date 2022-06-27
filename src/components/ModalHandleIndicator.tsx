import React from 'react'
import { ViewStyle } from 'react-native'
import { Box, mkUseStyles } from 'utils/theme'

export const ModalHandleIndicator = (p: { style?: ViewStyle }) => {
  const styles = useStyles()
  return <Box style={[styles.indicator, p.style ?? {}]} />
}

const useStyles = mkUseStyles((theme) => ({
  indicator: {
    width: 56,
    height: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.colors.grey,
    borderTopEndRadius: theme.borderRadii.xs,
    borderTopStartRadius: theme.borderRadii.xs,
    borderBottomEndRadius: theme.borderRadii.xs,
    borderBottomStartRadius: theme.borderRadii.xs,
  },
}))
