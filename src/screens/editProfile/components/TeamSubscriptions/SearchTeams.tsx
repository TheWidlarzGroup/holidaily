import React, { useCallback, useEffect, useState } from 'react'
import { Text } from 'utils/theme'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { ParsedTeamType, useTeamMocks } from 'utils/mocks/teamsMocks'
import { useWithConfirmation } from 'hooks/useWithConfirmation'
import { LoadingModal } from 'components/LoadingModal'
import { SearchResults } from './SearchResults'
import {
  filterNotSubmittedTeams,
  checkTeamsAvailableToSubscribe,
  filterSearchedItems,
} from '../../helpers/teamSubscriptionHelper'
import { SearchHeader } from './SearchHeader'
import { SearchBar } from './SearchBar'

type SearchBarProps = {
  selectedTeams: ParsedTeamType[]
  userTeams: ParsedTeamType[]
  setSelectedTeams: F1<ParsedTeamType[]>
}

export const SearchTeams = (p: SearchBarProps) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [masterData, setMasterData] = useState<ParsedTeamType[]>([])
  const [filteredTeams, setFilteredTeams] = useState<ParsedTeamType[]>([])
  const [searchedItems, setSearchedItems] = useState<ParsedTeamType[]>([])
  const { TEAMS, isLoading } = useTeamMocks()
  const { goBack } = useNavigation()
  const { t } = useTranslation('userProfile')
  const filterAlreadySubmittedSubscriptions = useCallback(() => {
    const teamsAvailableToSubscribe = filterNotSubmittedTeams(TEAMS, p.userTeams)
    setMasterData(teamsAvailableToSubscribe)
    setFilteredTeams(teamsAvailableToSubscribe)
  }, [p.userTeams, TEAMS])

  const searchFilter = (text: string) => {
    setSearchPhrase(text)
    if (text) {
      const searchedItems = filterSearchedItems(masterData, text)
      setSearchedItems(searchedItems)
      setFilteredTeams(checkTeamsAvailableToSubscribe(masterData, searchedItems))
    } else {
      setSearchedItems([])
      setFilteredTeams(masterData)
    }
  }

  useEffect(() => {
    if (TEAMS) filterAlreadySubmittedSubscriptions()
  }, [filterAlreadySubmittedSubscriptions, TEAMS])

  const toggleSelection = (id: number | string) => {
    masterData.forEach((team) => {
      if (team.id === id) {
        team.isSelected = !team.isSelected
      }
    })
  }

  const addToSubscriptions = ({ teamName, id, isSelected }: ParsedTeamType) => {
    const subscriptions = [...p.selectedTeams, { teamName, id, isSelected: !isSelected }]
    toggleSelection(id)
    p.setSelectedTeams(subscriptions)
  }

  const removeFromSubscriptions = (id: string | number) => {
    const subscriptions = p.selectedTeams.filter((item) => item.id !== id)
    toggleSelection(id)
    p.setSelectedTeams(subscriptions)
  }

  const quitWithoutSaving = useWithConfirmation({
    onAccept: () => {
      p.setSelectedTeams([])
      setFilteredTeams(masterData)
      goBack()
    },
    header: t('discardTeams'),
    declineBtnText: t('backToSelection'),
    acceptBtnText: t('discard'),
  })

  const handleGoBack = () => {
    if (p.selectedTeams.length > 0 || searchedItems.length > 0) {
      quitWithoutSaving()
    } else {
      goBack()
    }
  }
  if (isLoading) return <LoadingModal show />
  return (
    <>
      <SearchHeader handleGoBack={handleGoBack} />
      <SearchBar searchFilter={searchFilter} searchPhrase={searchPhrase} />
      <Text variant="lightGreyRegular">{`${t('selected')} ${p.selectedTeams.length}`}</Text>
      <SearchResults
        filteredTeams={filteredTeams}
        searchedItems={searchedItems}
        removeFromSubscriptions={removeFromSubscriptions}
        addToSubscriptions={addToSubscriptions}
      />
    </>
  )
}
