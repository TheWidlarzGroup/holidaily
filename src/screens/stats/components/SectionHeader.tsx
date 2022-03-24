import React from 'react'
import { Box, Text } from 'utils/theme'

type SectionHeaderProps = {
  text: string
}

export const SectionHeader = ({ text }: SectionHeaderProps) => (
  <Box alignItems="center" justifyContent="center" marginBottom="l">
    <Text variant="boldBlack18" textAlign="center">
      {text}
    </Text>
  </Box>
)
