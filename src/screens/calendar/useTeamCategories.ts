import { useTeamsContext } from 'hooks/context-hooks/useTeamsContext'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { Team } from 'mockApi/models'
import { useEffect, useState } from 'react'

export type FilterCategory = {
  id: number
  title: string
  isSelected: boolean
}

export const useTeamCategories = () => {
  const { teams } = useTeamsContext()
  const [filterCategories, setFilterCategories] = useState<FilterCategory[] | null>(null)
  const { user } = useUserContext()

  useEffect(() => {
    if (!teams.length) return
    const unsubscribedTeams: FilterCategory[] = []
    const userTeams: FilterCategory[] = []
    teams.forEach((team) => {
      if (user?.teams.some((t) => t.name === team.name))
        return userTeams.push(parseCategory(team, true))
      unsubscribedTeams.push(parseCategory(team, false))
    })
    setFilterCategories([...userTeams, ...unsubscribedTeams])
  }, [teams, user?.teams])

  const toggleFilterItemSelection = (id: number) => {
    setFilterCategories((prevState) => {
      if (!prevState) return []
      const newState = [...prevState]
      const index = newState.findIndex((item) => item.id === id)
      newState[index].isSelected = !prevState[index].isSelected
      return newState
    })
  }

  return {
    filterCategories,
    toggleFilterItemSelection,
  }
}

const parseCategory = (team: Team, isSelected: boolean) => ({
  id: +team.id,
  title: team.name,
  isSelected,
})
