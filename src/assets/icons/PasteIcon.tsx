import React, { FC } from 'react'
import Svg, { Path } from 'react-native-svg'

export type IconProps = {
  fill?: string
}

export const PasteIcon: FC<IconProps> = ({ fill }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.3491 4H9.65043C8.18643 4 7 5.19643 7 6.67277V21.3277C7 22.8036 8.18643 24 9.65043 24H21.3496C22.8131 24 24 22.8036 24 21.3272V6.67277C23.9996 5.19643 22.8131 4 21.3491 4ZM12.6665 8.28571H18.333C19.1153 8.28571 19.7497 7.64598 19.7497 6.85714H21.1663V21.1429H9.83326V6.85714H11.2499C11.2499 7.64598 11.8843 8.28571 12.6665 8.28571Z"
      fill={fill}
    />
    <Path
      d="M2.80641 0H15.1936C16.7437 0 18 1.25625 18.0005 2.80641L15 3H3V18L2.80641 21C1.25625 21 0 19.7438 0 18.1941V2.80641C0 1.25625 1.25625 0 2.80641 0Z"
      fill={fill}
    />
  </Svg>
)
