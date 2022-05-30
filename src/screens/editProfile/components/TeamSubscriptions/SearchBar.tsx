import React from 'react'
import { Box } from 'utils/theme'
import { InputSearchIcon } from 'components/InputSearchIcon'
import { CustomInput } from 'components/CustomInput'
import { isIos } from 'utils/layout'
import { useTranslation } from 'react-i18next'

type SearchBarProps = {
  searchFilter: F1<string>
  searchPhrase: string
}

export const SearchBar = ({ searchFilter, searchPhrase }: SearchBarProps) => {
  const { t } = useTranslation('userProfile')

  return (
    <Box position="relative" marginBottom="l">
      <CustomInput
        reset={() => searchFilter('')}
        inputLabel=""
        value={searchPhrase}
        onChange={(e) => searchFilter(e.nativeEvent.text)}
        variant="small"
        isError={false}
        placeholder={t('search')}
      />
      <Box position="absolute" top={isIos ? -2 : 0}>
        <InputSearchIcon />
      </Box>
    </Box>
  )
}
