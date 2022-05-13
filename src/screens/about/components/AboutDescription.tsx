import React from 'react'
import { Trans } from 'react-i18next'
import { Box, Text } from 'utils/theme'

export const AboutDescription = () => (
  <Box paddingHorizontal="m" paddingBottom="lplus">
    <Text textAlign="left" variant="textMD" color="black">
      {/* @ts-ignore  Trans component causes error in pipeline but not in IDE: "Type instantiation is excessively deep and possibly infinite." */}
      <Trans
        ns="welcome"
        i18nKey="aboutDesc1"
        components={{
          b: <Text variant="textBoldMD" color="primary" textAlign="left" />,
        }}
      />
    </Text>
    <Text textAlign="left" marginTop="l" variant="body1" color="black">
      {/* @ts-ignore */}
      <Trans
        ns="welcome"
        i18nKey="aboutDesc2"
        components={{
          b: <Text variant="textMD" textAlign="left" color="black" />,
        }}
      />
    </Text>
  </Box>
)
