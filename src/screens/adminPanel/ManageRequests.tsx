import React, { useCallback, useEffect } from 'react'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AdminPanelRoutes } from 'navigation/types'
import { Box } from 'utils/theme'
import { useNavigation } from '@react-navigation/native'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { StackNavigationProp } from '@react-navigation/stack'
import { useOrganizationRequests } from 'hooks/useOrganizationRequests'
import { useRequestActions } from 'hooks/useRequestActions'
import { RequestsList } from './components/RequestsList'

export const ManageRequests = () => {
  const adminNavigation = useNavigation<StackNavigationProp<AdminPanelRoutes>>()
  const { requests, setFilter, refetch } = useOrganizationRequests()
  const { approveRequest, isSuccessApprove } = useRequestActions()

  const handleGoBack = useCallback(() => {
    adminNavigation.navigate('Panel')
  }, [adminNavigation])

  useEffect(() => {
    setFilter('PENDING')
  }, [setFilter])

  useEffect(() => {
    if (isSuccessApprove) refetch()
  }, [isSuccessApprove, refetch])

  const rejectRequest = (requestId: string) => {
    console.log('rejectRequestMock', requestId)
  }

  return (
    <SafeAreaWrapper>
      <DrawerBackArrow goBack={handleGoBack} title={"Day's off requests"} />
      <Box marginHorizontal="m" flex={1}>
        {requests && (
          <RequestsList requests={requests} approve={approveRequest} reject={rejectRequest} />
        )}
      </Box>
    </SafeAreaWrapper>
  )
}
