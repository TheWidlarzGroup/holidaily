import React from 'react'
import { Box, mkUseStyles } from 'utils/theme'

export const Indicator = () => {
  const styles = useStyles()
  return <Box style={styles.indicator} />
}

const useStyles = mkUseStyles((theme) => ({
  indicator: {
    position: 'absolute',
    top: -10,
    left: '42%',
    width: 56,
    height: 3,
    backgroundColor: theme.colors.modalBackground,
    borderTopStartRadius: 2,
    borderBottomStartRadius: 2,
    borderTopEndRadius: 2,
    borderBottomEndRadius: 2,
  },
}))
