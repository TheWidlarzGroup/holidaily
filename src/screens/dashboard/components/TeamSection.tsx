import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { MateElement } from 'screens/dashboard/components/MateElement'
import { RequiredMateHolidaysData } from 'types/holidaysDataTypes'

type TeamSectionProps = {
  matesArray: RequiredMateHolidaysData[]
  isOutOfOffice: boolean
}

export const TeamSection = (props: TeamSectionProps) => {
  const { isOutOfOffice, matesArray } = props
  const { t } = useTranslation('dashboard')

  const version = {
    color: isOutOfOffice === true ? 'tertiary' : 'greyDark',
    text: isOutOfOffice === true ? 'outOfWorkNow' : 'outOfWorkSoon',
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
