import React, { FC } from 'react'

import { Box } from 'utils/theme'
import { TextLink } from './TextLink'

type DrawerBackArrowProps = {
  goBack: () => void
}

export const DrawerBackArrow: FC<DrawerBackArrowProps> = ({ goBack }) => (
  <Box marginLeft="l">
    <TextLink text="Go Back" action={goBack} variant="body1" />
  </Box>
)
