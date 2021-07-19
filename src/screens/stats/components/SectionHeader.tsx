import React from 'react'

import { Box, Text, theme } from 'utils/theme'

import { HeaderIcon } from './HeaderIcon'

type SectionHeaderProps = {
  text: string
  onMore?: F0
  onSearch?: F0
  onFilter?: F0
}

export const SectionHeader = ({ text, onMore, onSearch, onFilter }: SectionHeaderProps) => (
  <Box alignItems="center" flexDirection="row" marginHorizontal="s" marginBottom="l">
    <Box flex={1} marginLeft="xxxl">
      <Text variant="boldBlack18" textAlign="center">
        {text}
      </Text>
    </Box>
    <Box
      width={theme.spacing.xxxl}
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="center">
      {onMore && <HeaderIcon onPress={onMore} icon="dots" />}
      {onSearch && <HeaderIcon onPress={onSearch} icon="search" />}
      {onFilter && <HeaderIcon onPress={onFilter} icon="filter" />}
    </Box>
  </Box>
)
