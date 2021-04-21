import React, { FC } from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './PasteIcon'

export const HomeIcon: FC<IconProps> = ({ fill }) => (
  <Svg width="22" height="24" viewBox="0 0 22 24" fill="none">
    <Path
      d="M20.6234 9.61877L12.05 1.05002C11.4641 0.464081 10.5359 0.464081 9.95 1.05002L1.37656 9.62346C0.814063 10.186 0.5 10.95 0.5 11.7469V24H9.5V16.5C9.5 14.4985 12.5 14.4985 12.5 16.5V24H21.5V11.7422C21.5 10.9453 21.1859 10.1813 20.6234 9.61877ZM18.5 21H15.5V16.5C15.5 10.5 6.5 10.5 6.5 16.5C6.5 17.4985 6.5 20.0016 6.5 21H3.5V12L11 4.50002L18.5 12V21Z"
      fill={fill}
    />
  </Svg>
)
