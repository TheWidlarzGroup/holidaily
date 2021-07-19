import React from 'react'
import Svg, { Color, Path } from 'react-native-svg'

export const CheckmarkIcon = ({ fill }: { fill: Color }) => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.794 2.23045C12.0779 2.52789 12.067 2.99917 11.7696 3.28308L4.76225 9.97187C4.47455 10.2465 4.0218 10.2465 3.7341 9.97187L0.23045 6.62748C-0.0669866 6.34356 -0.0779467 5.87228 0.20597 5.57484C0.489887 5.27741 0.961167 5.26645 1.2586 5.55036L4.24818 8.40404L10.7414 2.20597C11.0388 1.92205 11.5101 1.93301 11.794 2.23045Z"
      fill={fill}
    />
  </Svg>
)
