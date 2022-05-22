import React from 'react'
import { Box } from 'utils/theme'
import { InputSearchIcon } from 'components/InputSearchIcon'
import { CustomInput } from 'components/CustomInput'
import { isIos } from 'utils/layout'

type SearchBarProps = {
  searchFilter: F1<string>
  searchPhrase: string
}

export const SearchBar = ({ searchFilter, searchPhrase }: SearchBarProps) => (
  <Box position="relative" marginBottom="l">
    <CustomInput
      reset={() => searchFilter('')}
      inputLabel=""
      value={searchPhrase}
      onChange={(e) => searchFilter(e.nativeEvent.text)}
      variant="small"
      isError={false}
    />
    <Box position="absolute" top={isIos ? -2 : 0}>
      <InputSearchIcon />
    </Box>
  </Box>
)
