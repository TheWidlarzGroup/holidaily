import React from 'react'
import { Box } from 'utils/theme'
import { HeaderIcon } from 'screens/stats/components/HeaderIcon'

type FilterBoxProps = {
  onSearch?: F0
  onFilter?: F0
}

export const FilterBox = ({ onSearch, onFilter }: FilterBoxProps) => (
  <Box
    alignItems="center"
    flexDirection="row"
    marginHorizontal="s"
    marginBottom="l"
    justifyContent="flex-end">
    <HeaderIcon onPress={onSearch} icon="search" />
    <HeaderIcon onPress={onFilter} icon="filter" />
  </Box>
)
