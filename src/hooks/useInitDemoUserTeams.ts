import { useGetOrganization } from 'dataAccess/queries/useOrganizationData'
import { useCallback, useRef } from 'react'
import { useTeamsContext } from './useTeamsContext'
import { useUserContext } from './useUserContext'

export const useInitDemoUserTeams = () => {
  const { user, updateUser } = useUserContext()
  const { data: organization } = useGetOrganization()
  const { addUserToTeams } = useTeamsContext()
  const idRef = useRef<string | null>(null)
  return useCallback(() => {
    if (!user || !organization?.teams.length) return
      if (user.id === idRef.current) return
      idRef.current = user.id
      const userTeams = organization.teams.slice(0, -2)
      updateUser({
        teams: userTeams,
      })
      addUserToTeams(
        user,
        userTeams.map((t) => t.name)
      )
  }, [user, organization?.teams, updateUser, addUserToTeams])
}
