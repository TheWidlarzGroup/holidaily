import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { TeamsType } from 'utils/mocks/teamsMocks'
import { Box } from 'utils/theme'
import { TertiaryButton } from 'components/TertiaryButton'

type ParsedTeamsType = TeamsType & { isSelected?: boolean }

type SearchResultsProps = {
  searchedItems: ParsedTeamsType[]
  filteredTeams: ParsedTeamsType[]
  removeFromSubscriptions: F1<string | number>
  addToSubscriptions: F1<ParsedTeamsType>
}

type ResultProps = {
  id: string | number
  teamName: string
  isSelected: boolean
  removeFromSubscriptions: SearchResultsProps['removeFromSubscriptions']
  addToSubscriptions: SearchResultsProps['addToSubscriptions']
}

export const SearchResults = (p: SearchResultsProps) => {
  const makeResult = (team: ParsedTeamsType) => (
    <Result
      key={team.id}
      id={team.id}
      teamName={team.teamName}
      isSelected={!!team.isSelected}
      removeFromSubscriptions={p.removeFromSubscriptions}
      addToSubscriptions={p.addToSubscriptions}
    />
  )
  return (
    <ScrollView>
      <Box flexDirection="row" flexWrap="wrap">
        {p.searchedItems.length > 0
          ? p.searchedItems.map(makeResult)
          : p.filteredTeams.map(makeResult)}
      </Box>
    </ScrollView>
  )
}

const Result = (p: ResultProps) => {
  const handleOnPress = () =>
    p.isSelected
      ? p.removeFromSubscriptions(p.id)
      : p.addToSubscriptions({ teamName: p.teamName, id: p.id, isSelected: p.isSelected })

  return <TertiaryButton onPress={handleOnPress} {...p} />
}
