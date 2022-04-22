import React from 'react'
import IconSearch from 'assets/icons/icon-search.svg'
import IconClose from 'assets/icons/icon-circle-cross.svg'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import { Box, mkUseStyles, Theme, useTheme } from 'utils/theme'

type SearchBarProps = {
  searchFilter: F1<string>
  searchPhrase: string
}

export const SearchBar = ({ searchFilter, searchPhrase }: SearchBarProps) => {
  const theme = useTheme()
  const styles = useStyles()
  return (
    <Box position="relative" marginTop="lplus" marginBottom="l">
      <TextInput style={styles.searchInput} onChangeText={searchFilter} value={searchPhrase} />
      <IconSearch style={styles.searchIcon} />
      <RectButton
        rippleColor={theme.colors.rippleColor}
        activeOpacity={0.5}
        style={styles.dropSearchBtn}
        onPress={() => searchFilter('')}>
        <IconClose />
      </RectButton>
    </Box>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  searchIcon: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    height: 36,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
    paddingLeft: theme.spacing.xxl,
  },
  dropSearchBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}))
