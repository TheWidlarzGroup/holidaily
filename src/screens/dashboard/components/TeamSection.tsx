import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { MateElement } from 'screens/dashboard/components/MateElement'
import { RequiredUserDetails } from 'types/holidaysDataTypes'

type TeamSectionProps = {
  matesArray: RequiredUserDetails[]
  isOutOfOffiece: boolean
}

export const TeamSection = (props: TeamSectionProps) => {
  const { isOutOfOffiece, matesArray } = props
  const { t } = useTranslation('dashboard')

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
        <MateElement key={mate.id} {...mate} />
      ))}
    </Box>
  )
}
