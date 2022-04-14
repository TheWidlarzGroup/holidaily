import React from 'react'
import { Trans } from 'react-i18next'
import { Box, Text } from 'utils/theme'

export const AboutDescription = () => (
  <Box paddingHorizontal="m" paddingBottom="xxxl">
    <Text textAlign="left" variant="body1">
// @ts-ignore
      <Trans
        ns="welcome"
        i18nKey="aboutDesc1"
        components={{
          b: <Text variant="body1Bold" />,
          bp: <Text variant="body1Bold" color="primary" />,
        }}
      />
    </Text>
    <Text textAlign="left" marginTop="l" variant="body1">
// @ts-ignore
      <Trans
        ns="welcome"
        i18nKey="aboutDesc2"
        components={{
          b: <Text variant="body1Bold" />,
        }}
      />
    </Text>
  </Box>
)
