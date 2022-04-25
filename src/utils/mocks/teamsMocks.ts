import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { useMemo } from 'react'

export type TeamsType = {
  teamName: string
  id: number | string
}

export type ParsedTeamType = TeamsType & { isSelected?: boolean }

export const useTeamMocks = () => {
  const { data: organization, isLoading } = useGetOrganization()
  const teams: TeamsType[] = useMemo(() => {
    if (!organization) return []
    return organization.teams.map((team) => ({ teamName: team.name, id: team.id }))
  }, [organization])
  return useMemo(() => ({ TEAMS: teams, isLoading }), [isLoading, teams])
}
