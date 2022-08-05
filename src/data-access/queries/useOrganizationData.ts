import { useQuery } from 'react-query'
import axios from 'axios'
import { Organization } from 'mock-api/models/mirageTypes'
import { QueryKeys } from 'dataAccess/QueryKeys'

export const getOrganization = async () => {
  const response = await axios.get('../mockedOrg.json')
  return response.data.organizations[0]
}

export const useGetOrganization = () =>
  useQuery<Organization>(QueryKeys.ORGANIZATION, getOrganization)
