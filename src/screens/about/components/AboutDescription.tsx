import React from 'react'
import { Trans } from 'react-i18next'
import { Box, Text } from 'utils/theme'

export const AboutDescription = () => (
  <Box paddingHorizontal="m" paddingBottom="lplus">
    <Text textAlign="left" variant="textMD" color="black">
      <Trans
        ns="welcome"
        i18nKey="aboutDesc1"
        components={{
          b: <Text variant="textBoldMD" color="primary" textAlign="left" />,
        }}
      />
    </Text>
    <Text variant="body1" textAlign="left" marginTop="l" color="black">
      <Trans
        ns="welcome"
        i18nKey="aboutDesc2"
        components={{
          b: <Text variant="textMD" color="black" textAlign="left" />,
        }}
      />
    </Text>
  </Box>
)
