import { TEAMS as masterData, TeamsType } from 'utils/mocks/teamsMocks'

export const checkTeamsAvailableToSubscribe = (subscriptions: TeamsType[]): TeamsType[] =>
  masterData.filter(
    (masterTeam) => !subscriptions.some(({ teamName }) => teamName === masterTeam.teamName)
  )
