import React from 'react'

import { Box, Text } from 'utils/theme'
import Character from 'assets/Character.svg'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/useUserContext'
import { Stats as StatsType } from 'dataAccess/queries/useFetchUserStats'
import { SectionHeader } from './components/SectionHeader'

export const Stats = ({ stats }: { stats: StatsType }) => {
  const { t } = useTranslation('stats')
  const { user } = useUserContext()

  return (
    <Box>
      <SectionHeader text="Your score" />
      <Box
        marginLeft="s"
        marginTop="l"
        backgroundColor="white"
        borderTopLeftRadius="lmin"
        borderBottomLeftRadius="lmin"
        padding="m"
        flexDirection="row"
        position="relative">
        <Box flex={1 / 2}>
          <Box flexDirection="row" alignItems="center">
            <Text variant="boldOrange20" marginRight="s">
              {user?.availablePto ?? 0}
            </Text>
            <Text variant="body1">{t('availablePto')}</Text>
          </Box>
          <Box height={1} backgroundColor="black" marginVertical="m" />
          <Box flexDirection="row" alignItems="center">
            <Text variant="bold15" marginRight="s">
              {stats.ptoTaken ?? 0}
            </Text>
            <Text variant="captionText">{t('takenPto')}</Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Text variant="bold15" marginRight="s">
              {stats.sickdaysTaken ?? 0}
            </Text>
            <Text variant="captionText">{t('sickdaysTaken')}</Text>
          </Box>
        </Box>
        <Box position="absolute" right={0} top="-35%">
          <Character />
        </Box>
      </Box>
    </Box>
  )
}
