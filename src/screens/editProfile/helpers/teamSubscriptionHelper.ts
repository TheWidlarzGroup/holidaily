import { TeamsType } from 'utils/mocks/teamsMocks'

type ParsedTeamsType = TeamsType & { isSelected?: boolean }

export const parseTeams = (teams: TeamsType[]) =>
  teams?.map((team) => ({ id: team.id, teamName: team.teamName, isSelected: false }))

export const filterNotSubmittedTeams = (teams: TeamsType[], userTeams: ParsedTeamsType[]) =>
  parseTeams(teams).filter(
    ({ teamName }) => !userTeams.some((userTeam) => userTeam.teamName === teamName)
  )
export const checkTeamsAvailableToSubscribe = (
  masterData: ParsedTeamsType[],
  subscriptions: ParsedTeamsType[]
): ParsedTeamsType[] =>
  masterData.filter(
    (masterTeam) => !subscriptions.some(({ teamName }) => teamName === masterTeam.teamName)
  )
export const filterSearchedItems = (masterData: ParsedTeamsType[], text: string) =>
  masterData.filter(({ teamName }) => teamName.toLowerCase().includes(text.toLowerCase()))
