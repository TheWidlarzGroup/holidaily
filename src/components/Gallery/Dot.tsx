import React, { useState } from 'react'
import { Box } from 'utils/theme';

type PropsType = { index: number; currentIndex: number; dataLen: number }
type DotType = {
  size: 6 | 8
  isActive: boolean
  isVisible: boolean
}

const defaultDot: DotType = { size: 8, isActive: false, isVisible: true }

export const Dot = (props: PropsType) => {
  const { index, currentIndex, dataLen } = props
  const [dot, setDot] = useState<DotType>(defaultDot)

  return (
    <Box
      backgroundColor={dot.isActive ? 'primary' : 'lightGrey'}
      width={dot.size}
      height={dot.size}
      borderRadius="l"
      margin="xs"
    />
  )
}
