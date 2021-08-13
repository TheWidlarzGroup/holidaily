import React from 'react'
import { FlatList } from 'react-native'
import { OrganizationRequestTypes } from 'types/useOrganizationRequestsTypes'
import { Request } from './Request'

type RequestsListTypes = {
  requests: OrganizationRequestTypes[]
  approve: (requestId: string) => void
  reject: (requestId: string) => void
}
export const RequestsList = ({ requests, approve, reject }: RequestsListTypes) => (
  <FlatList
    data={requests}
    renderItem={({ item }) => <Request request={item} approve={approve} reject={reject} />}
  />
)
