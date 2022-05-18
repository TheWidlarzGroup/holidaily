import React from 'react'
import { ViewStyle } from 'react-native'
import { Box, mkUseStyles } from 'utils/theme'

export const ModalHandleIndicator = (p: { style?: ViewStyle }) => {
  const styles = useStyles()
  return <Box style={[styles.indicator, p.style ?? {}]} />
}

const useStyles = mkUseStyles((theme) => ({
  indicator: {
    position: 'absolute',
    left: '42%',
    width: 56,
    height: 3,
    backgroundColor: theme.colors.grey,
    borderTopStartRadius: 2,
    borderBottomStartRadius: 2,
    borderTopEndRadius: 2,
    borderBottomEndRadius: 2,
  },
}))
