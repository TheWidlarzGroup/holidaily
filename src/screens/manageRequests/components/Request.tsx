import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { OrganizationRequestTypes } from 'types/useOrganizationRequestsTypes'
import { getFormattedPeriod } from 'utils/dates'
import { Box, Text, theme } from 'utils/theme'
import IconPending from 'assets/icons/icon-spinner.svg'
import IconCheck from 'assets/icons/icon-check.svg'
import IconReject from 'assets/icons/icon-cross.svg'
import IconSmallMessage from 'assets/icons/icon-message-small.svg'
import IconSmallPill from 'assets/icons/icon-pill-small.svg'
import IconSmallPaperclip from 'assets/icons/icon-paperclip-small.svg'
import { AdminPanelRequestsNavigationType } from 'navigation/types'
import { REQUEST_STATUS } from '../helpers'

type RequestTypes = {
  request: OrganizationRequestTypes
}

export const Request = ({ request }: RequestTypes) => {
  const navigation = useNavigation<AdminPanelRequestsNavigationType<'Requests'>>()
  const nameToDisplay =
    request.user.firstName || request.user.lastName
      ? `${request.user.firstName} ${request.user.lastName}`
      : request.user.email

  const backgroundColor = () => {
    switch (request?.status) {
      case REQUEST_STATUS.ACCEPTED:
        return theme.colors.successGreen
      case REQUEST_STATUS.REJECTED:
        return theme.colors.errorRed
      case REQUEST_STATUS.PENDING:
        return theme.colors.primary
      default:
        return theme.colors.transparent
    }
  }
  const navigateToRequestView = () => {
    navigation.navigate('AdminPanelRequestsNavigation', {
      screen: 'RequestView',
      params: { request },
    })
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={navigateToRequestView}>
      <Box
        marginTop="s"
        backgroundColor="bottomTabBgColor"
        borderRadius="lmin"
        flexDirection="row"
        overflow="hidden"
        minHeight={90}
        justifyContent="flex-start">
        <Box
          width={52}
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: backgroundColor() }}>
          {request.status === REQUEST_STATUS.PENDING && <IconPending />}
          {request.status === REQUEST_STATUS.ACCEPTED && <IconCheck />}
          {request.status === REQUEST_STATUS.REJECTED && <IconReject />}
        </Box>
        <Box marginLeft="xm" marginVertical="s" flex={1}>
          <Text numberOfLines={1} variant="label1">
            {nameToDisplay}
          </Text>
          <Text numberOfLines={1} variant="lightGreyRegular" marginBottom="s" color="greyDark">
            {request.user.occupation}
          </Text>
          <Text numberOfLines={1} variant="remind1" color="greyDark">
            {/* {getFormattedPeriod(request.range[0], request.range[request.range.length - 1], 'long')} */}
          </Text>
        </Box>
        <Box
          alignItems="flex-end"
          justifyContent="flex-end"
          flexDirection="row"
          marginRight="s"
          marginBottom="s"
          style={{ marginLeft: 'auto' }}>
          {!!request.message && <IconSmallMessage style={{ marginHorizontal: 5 }} />}
          <IconSmallPaperclip style={{ marginHorizontal: 5 }} />
          {request.sickTime && <IconSmallPill style={{ marginHorizontal: 5 }} />}
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
