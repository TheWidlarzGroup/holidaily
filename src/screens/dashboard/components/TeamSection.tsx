import React from 'react'
import { Box, Text } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { MateElement } from 'screens/dashboard/components/MateElement'
import { RequiredUserDetails } from 'types/holidaysDataTypes'
import { DashboardNavigationType } from 'navigation/types'

type TeamSectionProps = {
  matesArray: RequiredUserDetails[]
  isOutOfOffiece: boolean
}

export const TeamSection = (props: TeamSectionProps) => {
  const { isOutOfOffiece, matesArray } = props
  const { t } = useTranslation('dashboard')

  const navigation = useNavigation<DashboardNavigationType<'Dashboard'>>()
  const navigateToMateDetails = (mate: RequiredUserDetails) =>
    navigation.navigate('DashboardTeamMember', { ...mate })

  const version = {
    color: isOutOfOffiece === true ? 'tertiary' : 'greyDark',
    text: isOutOfOffiece === true ? 'outOfWorkNow' : 'outOfWorkSoon',
  }
  return (
    <Box>
      <Text variant="lightGreyRegular" color={version.color} marginTop="l">
        {t(version.text).toUpperCase()}
      </Text>
      {matesArray.map((mate) => (
        <MateElement
          key={mate.id}
          {...mate}
          navigateToMateScreen={() => navigateToMateDetails(mate)}
        />
      ))}
    </Box>
  )
}
