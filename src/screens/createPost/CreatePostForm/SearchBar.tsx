import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from 'utils/theme'
import { InputSearchIcon } from 'components/InputSearchIcon'
import { CustomInput } from 'components/CustomInput'
import { isIos } from 'utils/layout'

export type SearchBarProps = {
  onQueryChange: F1<string>
  onClear: F0
  query: string
}

export const SearchBar = (props: SearchBarProps) => {
  const { t } = useTranslation('feed')

  return (
    <Box position="relative">
      <CustomInput
        reset={props.onClear}
        inputLabel=""
        value={props.query}
        onChangeText={props.onQueryChange}
        variant="small"
        isError={false}
        placeholder={t('locationsSearch')}
      />
      <Box position="absolute" top={isIos ? -6 : 0}>
        <InputSearchIcon />
      </Box>
    </Box>
  )
}
