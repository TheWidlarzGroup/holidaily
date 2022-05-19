import React from 'react'
import { Box, Text, Theme, useTheme } from 'utils/theme'
import { Trans, useTranslation } from 'react-i18next'
import IconPill from 'assets/icons/icon-pill.svg'
import { BoxProps } from '@shopify/restyle'
import PlaneIcon from 'assets/icons/icon-paperplane.svg'

type SentReqsSectionCount = {
  sentReqsCount: number
  acceptedReqsCount: number
  pendingReqsCount: number
}

const SectionIconWrapper = ({ children, ...props }: React.PropsWithChildren<BoxProps<Theme>>) => (
  <Box
    aspectRatio={1}
    justifyContent="center"
    alignItems="center"
    borderRadius="full"
    height={24}
    {...props}>
    {children}
  </Box>
)

const SectionBoldText = ({ text }: { text: string }) => (
  <Text variant="textBoldMD" lineHeight={24} color="black">
    {text}
  </Text>
)

export const SentReqsSection = (p: SentReqsSectionCount) => {
  const theme = useTheme()
  const { t } = useTranslation('budget')
  return (
    <Box bg="specialBrighterOpaque" borderBottomRightRadius="l1min" padding="xm" flex={1}>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="textBoldSM" lineHeight={14} color="specialDarker">
          {t('sent')}
        </Text>
        <SectionIconWrapper bg="specialDarker" padding="s">
          <PlaneIcon color={theme.colors.alwaysWhite} />
        </SectionIconWrapper>
      </Box>
      <SectionBoldText text={t('requests', { number: p.sentReqsCount })} />
      <Text variant="textSM" textAlign="left" color="black">
        <Trans
          ns="budget"
          i18nKey="requestsStatus"
          components={{
            g: <Text variant="textSM" color="darkGreen" textAlign="left" />,
          }}
          values={{
            accepted: p.acceptedReqsCount,
            pending: p.pendingReqsCount,
          }}
        />
      </Text>
    </Box>
  )
}
export const SickDaysSection = (p: { sickDaysCount: number }) => {
  const theme = useTheme()
  const { t } = useTranslation('budget')
  return (
    <Box
      bg="quarternaryOpaque"
      borderBottomLeftRadius="l1min"
      padding="xm"
      flex={1}
      marginRight="s">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text variant="textBoldSM" color="quarternaryDark" lineHeight={21}>
          {t('took')}
        </Text>
        <SectionIconWrapper bg="quarternary">
          <IconPill height={13} color={theme.colors.alwaysWhite} />
        </SectionIconWrapper>
      </Box>
      <SectionBoldText text={t('sickDays', { number: p.sickDaysCount })} />
      <Text variant="textSM">{t('sickDaysLimit', { number: 21 })}</Text>
    </Box>
  )
}
