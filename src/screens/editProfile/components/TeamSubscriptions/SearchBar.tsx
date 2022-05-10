import React from 'react'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import { Box, mkUseStyles, Theme, useTheme } from 'utils/theme'
import { InputSearchIcon } from 'components/InputSearchIcon'
import DeleteIcon from 'assets/icons/icon-delete.svg'

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
      <Box position="absolute" top={-20}>
        <InputSearchIcon />
      </Box>
      <RectButton
        rippleColor={theme.colors.rippleColor}
        activeOpacity={0.5}
        style={styles.dropSearchBtn}
        onPress={() => searchFilter('')}>
        <DeleteIcon width={20} height={20} />
      </RectButton>
    </Box>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  searchIcon: {
    position: 'absolute',
    top: 7,
    left: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    height: 40,
    borderRadius: theme.borderRadii.xxl,
    paddingRight: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },
  dropSearchBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}))
