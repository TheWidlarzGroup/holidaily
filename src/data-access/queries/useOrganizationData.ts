import { useQuery } from 'react-query'
import axios from 'axios'
import { Organization } from 'mock-api/models/mirageTypes'
import { QueryKeys } from 'dataAccess/QueryKeys'
import { API } from 'dataAccess/API'

const getOrganization = async () => {
  const response = await axios.get(API.GET.getOrganization)
  return response.data.organizations[0]
}

export const useGetOrganization = () =>
  useQuery<Organization>(QueryKeys.ORGANIZATION, getOrganization)
