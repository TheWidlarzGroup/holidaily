import React, { FC } from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './PasteIcon'

export const MessageIcon: FC<IconProps> = ({ fill }) => (
  <Svg width="24" height="22" viewBox="0 0 24 22" fill="none">
    <Path
      d="M15.75 6.49615H6.75C5.69971 6.49615 5.69971 7.99515 6.75 7.99515H15.75C16.6494 7.99515 16.7988 6.49615 15.75 6.49615Z"
      fill={fill}
    />
    <Path
      d="M6.75 10.9932H12.75C13.7988 10.9932 13.6494 12.4922 12.75 12.4922H6.75C5.69971 12.4922 5.69971 10.9932 6.75 10.9932Z"
      fill={fill}
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.5 0.5H22.5C23.3994 0.5 24 1.09958 24 1.99899V16.9894C24 17.8889 23.3994 18.4885 22.5 18.4885H9.60059L7.05029 21.0368C6 22.0861 4.5 21.1867 4.5 19.9875V18.4885H1.5C0.600586 18.4885 0 17.8889 0 16.9894V1.99899C0 1.09958 0.600586 0.5 1.5 0.5ZM3 15.4904H21V3.49808H3V15.4904Z"
      fill={fill}
    />
  </Svg>
)
