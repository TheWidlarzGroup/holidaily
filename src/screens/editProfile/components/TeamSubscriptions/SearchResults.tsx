import React from 'react'
import { Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { TeamsType } from 'utils/mocks/teamsMocks'
import { Box, mkUseStyles, Text, Theme, useTheme } from 'utils/theme'
import CrossIcon from 'assets/icons/icon-close.svg'

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
      {p.searchedItems.length > 0 && (
        <Box
          flexDirection="row"
          flexWrap="wrap"
          borderBottomColor="headerGrey"
          borderBottomWidth={1}
          paddingBottom="xl">
          {p.searchedItems.map(makeResult)}
        </Box>
      )}
      <Box flexDirection="row" flexWrap="wrap">
        {p.filteredTeams.map(makeResult)}
      </Box>
    </ScrollView>
  )
}

const Result = (p: ResultProps) => {
  const styles = useStyles()
  const theme = useTheme()
  return (
    <Pressable
      style={p.isSelected ? styles.subscribedTeam : styles.teamItem}
      android_ripple={{
        color: theme.colors.alwaysWhite,
        foreground: true,
      }}
      onPress={() =>
        p.isSelected
          ? p.removeFromSubscriptions(p.id)
          : p.addToSubscriptions({ teamName: p.teamName, id: p.id, isSelected: p.isSelected })
      }>
      <Text color={p.isSelected ? 'alwaysWhite' : 'special'} variant="bold15" marginRight="s">
        {p.teamName}
      </Text>
      {p.isSelected && <CrossIcon height={12} color={theme.colors.alwaysWhite} />}
    </Pressable>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  teamItem: {
    height: 45,
    backgroundColor: theme.colors.white,
    borderWidth: 1.2,
    borderColor: theme.colors.special,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    borderRadius: theme.borderRadii.l,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribedTeam: {
    height: 45,
    backgroundColor: theme.colors.special,
    borderColor: theme.colors.special,
    borderWidth: 1.2,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    borderRadius: theme.borderRadii.l,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
