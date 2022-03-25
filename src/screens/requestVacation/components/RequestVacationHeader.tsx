import React from 'react'
import { Box } from 'utils/theme'
import { RequestVacationBar } from 'components/RequestVacationBar'
import { ModalHeader } from 'components/ModalHeader'
import { RequestVacationHeaderText } from './RequestVacationHeaderText'

type HeaderProps = { step: number; setStep: F1<number> } | { isSent: true }

export const RequestVacationHeader = (p: HeaderProps) =>
  'isSent' in p ? (
    <ModalHeader>
      <RequestVacationHeaderText isSent />
    </ModalHeader>
  ) : (
    <Box paddingBottom="m">
      <RequestVacationHeaderText step={p.step} setStep={p.setStep} />
      <RequestVacationBar currentScreen={p.step ? 'Summary' : 'Form'} />
    </Box>
  )
