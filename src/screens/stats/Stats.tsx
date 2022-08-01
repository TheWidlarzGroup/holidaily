import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Stats as StatsType } from 'dataAccess/queries/useFetchUserStats'
import { SectionHeader } from './components/SectionHeader'

type StatsTabProps = {
  caption: string
  type: 'daysAvailable' | 'daysUsed'
  value?: number | `${number}`
}

export const Stats = ({ stats }: { stats: StatsType }) => {
  const { user } = useUserContext()
  const { t } = useTranslation('stats')

  return (
    <Box marginTop="m">
      <SectionHeader text={t('requests')} />
      <Box marginTop="m" marginBottom="s" flexDirection="row" justifyContent="space-between">
        <StatsTab value={user?.availablePto} caption={t('daysToUse')} type="daysAvailable" />
        <StatsTab value={stats.sickdaysTaken} caption={t('sickLeaveDaysTaken')} type="daysUsed" />
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
    backgroundColor={
      props.type === 'daysAvailable' ? 'tertiaryOpaqueBrighter' : 'quarternaryOpaque'
    }
    borderBottomRightRadius={props.type === 'daysAvailable' ? 'mplus' : 'none'}
    borderBottomLeftRadius={props.type === 'daysAvailable' ? 'none' : 'mplus'}
    borderTopLeftRadius={props.type === 'daysAvailable' ? 'none' : 'mplus'}
    borderTopRightRadius={props.type === 'daysAvailable' ? 'mplus' : 'none'}>
    <Text
      variant="displayBoldMD"
      marginTop="m"
      lineHeight={30}
      color={props.type === 'daysAvailable' ? 'tertiary' : 'quarternaryDark'}>
      {props.value ?? 0}
    </Text>
    <Text
      variant="displayXS"
      marginBottom="m"
      lineHeight={18}
      color={props.type === 'daysAvailable' ? 'tertiary' : 'quarternaryDark'}>
      {props.caption}
    </Text>
  </Box>
)
