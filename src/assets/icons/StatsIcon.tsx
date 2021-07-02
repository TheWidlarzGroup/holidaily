import React, { FC } from 'react'
import Svg, { Path } from 'react-native-svg'

export type IconProps = {
  fill: string
}

export const StatsIcon: FC<IconProps> = ({ fill }) => (
  <Svg width="23" height="23" viewBox="0 0 22 13" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.6339 0.366117C22.122 0.854272 22.122 1.64573 21.6339 2.13388L12.1339 11.6339C11.6457 12.122 10.8543 12.122 10.3661 11.6339L6.75 8.01777L2.13388 12.6339C1.64573 13.122 0.854272 13.122 0.366117 12.6339C-0.122039 12.1457 -0.122039 11.3543 0.366117 10.8661L5.86612 5.36612C6.35427 4.87796 7.14573 4.87796 7.63388 5.36612L11.25 8.98223L19.8661 0.366117C20.3543 -0.122039 21.1457 -0.122039 21.6339 0.366117Z"
      fill={fill}
    />
  </Svg>
)
