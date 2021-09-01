import React from 'react'
import { Box } from 'utils/theme'
import { HeaderIcon } from 'screens/stats/components/HeaderIcon'

type Props = {
  onSearch?: F0
  onFilter?: F0
}

export const FilterBox = (p: Props) => (
  <Box
    alignItems="center"
    flexDirection="row"
    marginHorizontal="s"
    marginBottom="l"
    justifyContent="flex-end">
    <HeaderIcon onPress={p.onSearch} icon="search" />
    <HeaderIcon onPress={p.onFilter} icon="filter" />
  </Box>
)
