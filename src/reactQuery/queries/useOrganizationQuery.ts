import { useQuery } from 'react-query'
import axios from 'axios'
import { Organization } from 'mock-api/models/Organization'
import { QueryKeys } from '../QueryKeys'
import { API } from '../API'

export const getOrganization = async () => {
  const response = await axios.get(API.GET.getOrganization)
  return response.data.organizations[0]
}

export const useGetOrganization = () =>
  useQuery<Organization>(QueryKeys.ORGANIZATION, getOrganization)
