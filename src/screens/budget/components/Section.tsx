import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getDurationInDays } from 'utils/dates'
import { BaseOpacity, Box, mkUseStyles, Text, Theme, useTheme } from 'utils/theme'
import ArrowRight from 'assets/icons/arrow-right.svg'
import { useNavigation } from '@react-navigation/native'
import { BudgetNavigationType } from 'navigation/types'
import { Languages } from '../../../../i18n'

type SectionProps = {
  variant: 'sick' | 'took' | 'left'
  duration: number
}

const headerColors: Record<SectionProps['variant'], keyof Theme['colors']> = {
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
  const { navigate } = useNavigation<BudgetNavigationType<'BUDGET'>>()
  const { data: organization } = useGetOrganization()
  const PTO_LIMIT = organization?.maxPtoDays ?? 21
  return (
    <Box bg="veryLightGrey" borderRadius="l1min" marginBottom="s" overflow="hidden">
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
          <BaseOpacity
            hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
            position="absolute"
            right={theme.spacing.m}
            top="40%"
            onPress={() => navigate('PTO_POLICY')}>
            <ArrowRight color={theme.colors.darkGrey} />
          </BaseOpacity>
          <ProgressBar value={p.duration} max={PTO_LIMIT} />
        </>
      )}
    </Box>
  )
}

const ProgressBar = ({ value, max }: { value: number; max: number }) => {
  const styles = useStyles()
  const theme = useTheme()
  return (
    <>
      <Box
        style={[styles.progressTranslation]}
        width={`${(value / max) * 100}%`}
        height={theme.spacing.xs}
        position="absolute"
        bottom={4}
        right={0}
        backgroundColor="special"
        borderRadius="m"
        zIndex="2"
      />
      <Box
        width="100%"
        height={theme.spacing.xs}
        bg="lightGrayOpaque"
        borderRadius="m"
        position="absolute"
        bottom={0}
      />
    </>
  )
}

const useStyles = mkUseStyles(() => ({
  progressTranslation: {
    transform: [
      {
        translateY: 4,
      },
    ],
  },
  infoPressable: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'transparent',
    right: 0,
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
}))
