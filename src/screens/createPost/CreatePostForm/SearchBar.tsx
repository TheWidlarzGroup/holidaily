import React, { useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import { BaseOpacity, Box, mkUseStyles, Theme } from 'utils/theme'

import IconClear from 'assets/icons/icon-circle-cross.svg'
import IconSearch from 'assets/icons/icon-search.svg'
import { useDebouncedCallback } from 'hooks/useDebounce'

export type SearchBarProps = {
  onQueryChange: F1<string>
  onClear: F0
  delay?: number
}

export const SearchBar = (props: SearchBarProps) => {
  const { onClear, onQueryChange, delay } = props
  const [query, setQuery] = useState('')
  const inputRef = useRef<TextInput>(null)

  const { t } = useTranslation('feed')

  const styles = useStyles()

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const clearQuery = () => {
    setQuery('')
    onClear()
  }

  const handleQueryCallback = useCallback(() => {
    if (query === '') return
    onQueryChange(query)
  }, [onQueryChange, query])

  useDebouncedCallback(handleQueryCallback, delay)

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
        value={query}
        placeholder={t('locationsSearch')}
        onChangeText={setQuery}
      />
      <BaseOpacity onPress={clearQuery} paddingHorizontal="s">
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
