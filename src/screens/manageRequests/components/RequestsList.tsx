import React from 'react'
import { FlatList } from 'react-native'
import { OrganizationRequestTypes } from 'types/useOrganizationRequestsTypes'
import { Request } from './Request'

type RequestsListTypes = {
  requests: OrganizationRequestTypes[]
}
export const RequestsList = ({ requests }: RequestsListTypes) => (
  <FlatList data={requests} renderItem={({ item }) => <Request request={item} />} />
)
