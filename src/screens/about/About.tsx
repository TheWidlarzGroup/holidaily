import React from 'react'
import { Box } from 'utils/theme'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AboutDescription } from './components/AboutDescription'
import { AboutBackground } from './components/AboutBackground'
import { AboutHeader } from './components/AboutHeader'
import { AboutLinks } from './components/AboutLinks'

type AboutTypes = { isFromWelcomeScreen?: true; closeModal: F0 }

export const About = ({ isFromWelcomeScreen, closeModal }: AboutTypes) => (
  <SafeAreaWrapper isDefaultBgColor>
    <Box backgroundColor="white" paddingTop={isFromWelcomeScreen ? 0 : 'm'} flexGrow={1}>
      <AboutHeader closeModal={closeModal} isFromWelcomeScreen={isFromWelcomeScreen} />
      <Box justifyContent="space-between" flex={1}>
        <AboutDescription />
        <AboutLinks />
        <AboutBackground />
      </Box>
    </Box>
  </SafeAreaWrapper>
)
