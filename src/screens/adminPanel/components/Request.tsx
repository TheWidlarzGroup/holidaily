import React from 'react'
import { TouchableOpacity } from 'react-native'
import { OrganizationRequestTypes } from 'types/useOrganizationRequestsTypes'
import { getFormattedPeriod } from 'utils/dates'
import { Box, Text } from 'utils/theme'

type RequestTypes = {
  request: OrganizationRequestTypes
  approve: (requestId: string) => void
  reject: (requestId: string) => void
}

export const Request = ({ request, approve, reject }: RequestTypes) => (
  <TouchableOpacity activeOpacity={1}>
    <Box
      marginHorizontal="s"
      marginTop="s"
      backgroundColor="bottomTabBgColor"
      borderRadius="lmin"
      paddingHorizontal="m"
      paddingVertical="xm"
      flexDirection="row"
      justifyContent="space-between">
      <Box>
        <Text variant="bold16" marginBottom="s">
          {request.user.firstName} {request.user.lastName}
        </Text>
        <Text variant="captionText">{request.description}</Text>
        <Text variant="captionText" color="headerGrey">
          {getFormattedPeriod(request.range[0], request.range[request.range.length - 1], 'long')}
        </Text>
      </Box>
      <Box alignItems="center" justifyContent="flex-end" flexDirection="row">
        <TouchableOpacity onPress={() => approve(request.id)}>
          <Text>a</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => reject(request.id)}>
          <Text>r</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  </TouchableOpacity>
)
