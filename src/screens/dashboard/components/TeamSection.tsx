import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { MateElement } from 'screens/dashboard/components/MateElement'
import { MateHolidaysData, RequiredMateHolidaysData } from 'types/holidaysDataTypes'

type TeamSectionProps = {
  matesArray: RequiredMateHolidaysData[]
  isOutOfOffice: boolean
  openUserModal: F1<MateHolidaysData>
}

export const TeamSection = (props: TeamSectionProps) => {
  const { isOutOfOffice, matesArray, openUserModal } = props
  const { t } = useTranslation('dashboard')

  const version: { color: 'tertiary' | 'headerGrey'; text: 'outOfWorkNow' | 'outOfWorkSoon' } = {
    color: isOutOfOffice === true ? 'tertiary' : 'headerGrey',
    text: isOutOfOffice === true ? 'outOfWorkNow' : 'outOfWorkSoon',
  }
  return (
    <Box>
      <Text variant="lightGreyRegular" color={version.color} marginTop="l">
        {t(version.text).toUpperCase()}
      </Text>
      {matesArray.map((mate) => (
        <MateElement key={mate.id} userData={mate} openUserModal={openUserModal} />
      ))}
    </Box>
  )
}
