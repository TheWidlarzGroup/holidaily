import React from 'react'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { TeamsType } from 'utils/mocks/teamsMocks'
import { Box, mkUseStyles, Text, Theme } from 'utils/theme'

type ParsedTeamsType = TeamsType & { isSelected?: boolean }

type SearchResultsProps = {
  searchedItems: ParsedTeamsType[]
  filteredTeams: ParsedTeamsType[]
  removeFromSubscriptions: F1<string | number>
  addToSubscriptions: F1<ParsedTeamsType>
}

export const SearchResults = (p: SearchResultsProps) => {
  const styles = useStyles()
  return (
    <ScrollView>
      {p.searchedItems.length > 0 && (
        <Box
          flexDirection="row"
          flexWrap="wrap"
          borderBottomColor="headerGrey"
          borderBottomWidth={1}
          paddingBottom="xl">
          {p.searchedItems.map(({ teamName, id, isSelected }) => (
            <RectButton
              key={id}
              style={isSelected ? styles.subscribedTeam : styles.teamItem}
              onPress={() =>
                isSelected
                  ? p.removeFromSubscriptions(id)
                  : p.addToSubscriptions({ teamName, id, isSelected })
              }>
              <Text color={isSelected ? 'white' : 'black'} variant="bold15">
                {teamName}
              </Text>
            </RectButton>
          ))}
        </Box>
      )}
      <Box flexDirection="row" flexWrap="wrap">
        {p.filteredTeams.map(({ teamName, id, isSelected }) => (
          <RectButton
            key={id}
            style={isSelected ? styles.subscribedTeam : styles.teamItem}
            onPress={() =>
              isSelected
                ? p.removeFromSubscriptions(id)
                : p.addToSubscriptions({ teamName, id, isSelected })
            }>
            <Text color={isSelected ? 'white' : 'black'} variant="bold15">
              {teamName}
            </Text>
          </RectButton>
        ))}
      </Box>
    </ScrollView>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  teamItem: {
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.xm,
    borderRadius: theme.borderRadii.l,
  },
  subscribedTeam: {
    backgroundColor: theme.colors.black,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.xm,
    borderRadius: theme.borderRadii.l,
  },
}))
