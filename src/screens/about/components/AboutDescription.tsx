import React from 'react'
import { Trans } from 'react-i18next'
import { Box, Text } from 'utils/theme'

type AboutDescriptionProps = {
  isFromWelcomeScreen?: true
}

export const AboutDescription = (p: AboutDescriptionProps) => (
  <Box marginHorizontal="m" paddingBottom="lplus" paddingTop="ml">
    <Text textAlign="left" variant="textMD" color="black">
      <Trans
        ns="welcome"
        i18nKey="aboutDesc1"
        components={{
          b: (
            <Text
              variant="textBoldMD"
              color={p.isFromWelcomeScreen ? 'primary' : 'black'}
              textAlign="left"
            />
          ),
        }}
      />
    </Text>
    <Text variant="body1" textAlign="left" marginTop="l" color="black">
      <Trans
        ns="welcome"
        i18nKey="aboutDesc2"
        components={{
          b: (
            <Text
              variant={p.isFromWelcomeScreen ? 'textMD' : 'textBoldMD'}
              color="black"
              textAlign="left"
            />
          ),
        }}
      />
    </Text>
  </Box>
)
