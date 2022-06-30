import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getDurationInDays } from 'utils/dates'
import { Box, Text, useTheme, Colors } from 'utils/theme'
import ArrowRight from 'assets/icons/arrow-right.svg'
import { Languages } from '../../../../i18n'

type SectionProps = {
  variant: 'sick' | 'took' | 'left'
  duration: number
}

const headerColors: Record<SectionProps['variant'], Colors> = {
  sick: 'quarternary',
  took: 'special',
  left: 'tertiary',
}

const descriptions: Record<SectionProps['variant'], keyof Languages['en']['budget']> = {
  sick: 'sickDays',
  took: 'took',
  left: 'left',
}

export const Section = (p: SectionProps) => {
  const { t } = useTranslation('budget')
  const theme = useTheme()
  const { data: organization } = useGetOrganization()
  const PTO_LIMIT = organization?.maxPtoDays ?? 21
  return (
    <Box
      bg="veryLightGrey"
      borderRadius="l1min"
      marginBottom="s"
      overflow="hidden"
      marginHorizontal="m">
      <Box padding="m">
        <Text variant="textBoldMD" color={headerColors[p.variant]} marginBottom="s">
          {getDurationInDays(p.duration)}
        </Text>
        <Text variant="textXS" color="darkGrey">
          {t(descriptions[p.variant])}
        </Text>
      </Box>

      {p.variant === 'left' && (
        <>
          <Box position="absolute" right={theme.spacing.m} top="40%">
            <ArrowRight color={theme.colors.darkGrey} />
          </Box>
          <ProgressBar value={p.duration} max={PTO_LIMIT} />
        </>
      )}
    </Box>
  )
}

const ProgressBar = ({ value, max }: { value: number; max: number }) => (
  <>
    <Box
      width={`${(value / max) * 100}%`}
      padding="xxs"
      position="absolute"
      bottom={0}
      right={0}
      backgroundColor="special"
      borderRadius="m"
      zIndex="2"
    />
    <Box
      width="100%"
      padding="xxs"
      bg="lightGrayOpaque"
      borderRadius="m"
      position="absolute"
      bottom={0}
    />
  </>
)
