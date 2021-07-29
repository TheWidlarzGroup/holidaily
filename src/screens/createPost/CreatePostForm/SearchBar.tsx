import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import { BaseOpacity, Box, mkUseStyles, Theme } from 'utils/theme'

import IconClear from 'assets/icons/icon-circle-cross.svg'
import IconSearch from 'assets/icons/icon-search.svg'

export type SearchBarProps = {
  onQueryChange: F1<string>
  onClear: F0
  query: string
}

export const SearchBar = (props: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null)

  const { t } = useTranslation('feed')
  const styles = useStyles()

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <Box
      borderWidth={2}
      borderRadius="xxl"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-around">
      <BaseOpacity onPress={focusInput} paddingHorizontal="s">
        <IconSearch />
      </BaseOpacity>
      <TextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        style={styles.input}
        value={props.query}
        placeholder={t('locationsSearch')}
        onChangeText={props.onQueryChange}
      />
      <BaseOpacity onPress={props.onClear} paddingHorizontal="s">
        <IconClear />
      </BaseOpacity>
    </Box>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  input: {
    ...theme.textVariants.regular15,
    flexGrow: 1,
    borderColor: theme.colors.transparent,
  },
}))
