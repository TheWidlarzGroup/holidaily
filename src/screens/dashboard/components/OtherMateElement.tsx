import React from 'react'
import { BaseOpacity, Box, Text } from 'utils/theme'
import { Avatar } from 'components/Avatar'
import { User } from 'mock-api/models/mirageTypes'
import { makeUserDetails } from 'utils/userDetails'
import { Analytics } from 'services/analytics'

type OtherMateTypes = {
  mate: User
  openUserModal: F1<User>
}

export const OtherMateElement = (props: OtherMateTypes) => {
  const { firstName, lastName, photo } = props.mate
  const handleOnPress = () => {
    props.openUserModal(props.mate)
    Analytics().track('DASHBOARD_TEAM_MATE_OPENED', { teamMateName: `${firstName} ${lastName}` })
  }

  return (
    <BaseOpacity
      marginVertical="s"
      alignItems="center"
      flexBasis="25%"
      marginBottom="m"
      onPress={handleOnPress}>
      <Box marginBottom="s">
        <Avatar size="l" src={photo} userDetails={makeUserDetails(props.mate)} />
      </Box>
      <Text variant="displayXS">{firstName}</Text>
      <Text variant="displayXS">{lastName}</Text>
    </BaseOpacity>
  )
}
