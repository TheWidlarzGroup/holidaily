import React from 'react'
import { Box, Colors, Text, Theme } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Stats as StatsType } from 'dataAccess/queries/useFetchUserStats'
import { ResponsiveValue } from '@shopify/restyle'
import { SectionHeader } from './components/SectionHeader'

type StatsTabProps = {
  bgColor: ResponsiveValue<Colors, Theme>
  textColor: ResponsiveValue<Colors, Theme>
  caption: string
  value?: number | `${number}`
}

export const Stats = ({ stats }: { stats: StatsType }) => {
  const { user } = useUserContext()
  const { t } = useTranslation('stats')

  return (
    <Box marginTop="m">
      <SectionHeader text={t('requests')} />
      <Box marginTop="m" marginBottom="s" flexDirection="row" justifyContent="space-around">
        <StatsTab
          bgColor="tertiaryOpaqueBrighter"
          textColor="tertiary"
          value={user?.availablePto}
          caption={t('daysToUse')}
        />
        <StatsTab
          bgColor="quarternaryOpaque"
          textColor="quarternaryDark"
          value={stats.sickdaysTaken}
          caption={t('sickLeaveDaysTaken')}
        />
      </Box>
    </Box>
  )
}

const StatsTab = (props: StatsTabProps) => (
  <Box
    width="49%"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    backgroundColor={`${props.bgColor}`}>
    <Text variant="bold20" marginTop="m" lineHeight={30} color={`${props.textColor}`}>
      {props.value ?? 0}
    </Text>
    <Text variant="displayXS" marginBottom="m" lineHeight={18} color={`${props.textColor}`}>
      {props.caption}
    </Text>
  </Box>
)
