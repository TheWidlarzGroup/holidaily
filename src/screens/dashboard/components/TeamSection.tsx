import React from 'react'
import { Box, Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { MateElement } from 'screens/dashboard/components/MateElement'
import { User } from 'mock-api/models/mirageTypes'

type TeamSectionProps = {
  matesArray: User[]
  isOutOfOffice: boolean
  openUserModal: F1<User>
}

export const TeamSection = (props: TeamSectionProps) => {
  const { isOutOfOffice, matesArray, openUserModal } = props
  const { t } = useTranslation('dashboard')

  // version - to change while reskin TeamSection
  const version: { color: 'tertiary' | 'headerGrey'; text: 'outOfWorkNow' | 'outOfWorkSoon' } = {
    color: isOutOfOffice === true ? 'tertiary' : 'headerGrey',
    text: isOutOfOffice === true ? 'outOfWorkNow' : 'outOfWorkSoon',
  }
  return (
    <Box>
      <Text variant="lightGreyRegular" color="darkGreyBrighter" marginTop="l">
        {t(version.text).toUpperCase()}
      </Text>
      {matesArray.map((mate) => (
        <MateElement key={mate.id} userData={mate} openUserModal={openUserModal} />
      ))}
    </Box>
  )
}
