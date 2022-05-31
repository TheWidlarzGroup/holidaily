import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text } from 'utils/theme'
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
    <Box position="relative" flexDirection="row" alignItems="center" marginHorizontal="-s">
      <Box flex={1}>
        <CustomInput
          reset={props.onClear}
          inputLabel=""
          value={props.query}
          onChangeText={props.onQueryChange}
          variant="small"
          isError={false}
          placeholder={t('locationsSearch')}
        />
      </Box>
      <Box position="absolute" top={isIos ? -2 : 0}>
        <InputSearchIcon />
      </Box>
      {props.query.length > 0 && (
        <BaseOpacity
          onPress={props.onClear}
          marginLeft="xm"
          height={36}
          justifyContent="center"
          alignItems="center"
          marginTop="m">
          <Text variant="buttonSM" color="special">
            {t('cancel')}
          </Text>
        </BaseOpacity>
      )}
    </Box>
  )
}
