import React, { useCallback, useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { Box, Text, mkUseStyles, Theme, useTheme } from 'utils/theme'
import IconSearch from 'assets/icons/icon-search.svg'
import IconClose from 'assets/icons/icon-circle-cross.svg'
import IconBack from 'assets/icons/icon-back.svg'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { useModalContext } from 'contexts/ModalProvider'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { TEAMS, TeamsType } from 'utils/mocks/teamsMocks'
import { SearchResults } from './SearchResults'
import {
  filterNotSubmittedTeams,
  checkTeamsAvailableToSubscribe,
  filterSearchedItems,
} from '../../helpers/teamSubscriptionHelper'

type ParsedTeamsType = TeamsType & { isSelected?: boolean }

type SearchBarProps = {
  subscribedTeams: ParsedTeamsType[]
  userTeams: ParsedTeamsType[]
  setSubscribedTeams: F1<ParsedTeamsType[]>
}

export const SearchBar = (p: SearchBarProps) => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [masterData, setMasterData] = useState<ParsedTeamsType[]>([])
  const [filteredTeams, setFilteredTeams] = useState<ParsedTeamsType[]>([])
  const [searchedItems, setSearchedItems] = useState<ParsedTeamsType[]>([])
  const { goBack } = useNavigation()
  const { showModal, hideModal } = useModalContext()
  const filterAlreadySubmittedSubscriptions = useCallback(() => {
    const teamsAvailableToSubscribe = filterNotSubmittedTeams(TEAMS, p.userTeams)
    setMasterData(teamsAvailableToSubscribe)
    setFilteredTeams(teamsAvailableToSubscribe)
  }, [p.userTeams])

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
  }, [filterAlreadySubmittedSubscriptions])

  const toggleSelection = (id: number | string) => {
    masterData.forEach((team) => {
      if (team.id === id) {
        team.isSelected = !team.isSelected
      }
    })
  }

  const addToSubscriptions = ({ teamName, id, isSelected }: ParsedTeamsType) => {
    const subscriptions = [...p.subscribedTeams, { teamName, id, isSelected: !isSelected }]
    toggleSelection(id)
    p.setSubscribedTeams(subscriptions)
  }

  const removeFromSubscriptions = (id: string | number) => {
    const subscriptions = p.subscribedTeams.filter((item) => item.id !== id)
    toggleSelection(id)
    p.setSubscribedTeams(subscriptions)
  }

  const handleGoBack = () => {
    if (p.subscribedTeams.length > 0 || searchedItems.length > 0) {
      showModal(
        <ConfirmationModal
          isVisible
          hideModal={hideModal}
          onAccept={() => {
            p.setSubscribedTeams([])
            setFilteredTeams(masterData)
            hideModal()
            goBack()
          }}
          onDecline={hideModal}
          content={t('quitMessage')}
        />
      )
    } else {
      goBack()
    }
  }

  const styles = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('userProfile')
  return (
    <>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <TouchableOpacity activeOpacity={0.2} onPress={handleGoBack} style={styles.backBtn}>
          <IconBack />
        </TouchableOpacity>
        <Text style={{ transform: [{ translateX: -20 }] }} variant="boldBlackCenter20">
          {t('subscribeMoreTeams')}
        </Text>
        <Box />
      </Box>

      <Box position="relative" marginTop="lplus" marginBottom="l">
        <TextInput style={styles.searchInput} onChangeText={searchFilter} value={searchPhrase} />
        <IconSearch style={styles.searchIcon} />
        <RectButton
          rippleColor={theme.colors.rippleColor}
          activeOpacity={0.5}
          style={styles.dropSearchBtn}
          onPress={() => searchFilter('')}>
          <IconClose />
        </RectButton>
      </Box>
      <Text variant="lightGreyRegular">{`${t('selected')} ${p.subscribedTeams.length}`}</Text>
      <SearchResults
        filteredTeams={filteredTeams}
        searchedItems={searchedItems}
        removeFromSubscriptions={removeFromSubscriptions}
        addToSubscriptions={addToSubscriptions}
      />
    </>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  searchIcon: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    height: 36,
    borderRadius: theme.borderRadii.xxl,
    paddingHorizontal: theme.spacing.m,
    paddingLeft: theme.spacing.xxl,
  },

  dropSearchBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  backBtn: {
    // position: 'absolute',
    // left: 15,
    // top: 17,
    // zIndex: 100000,
  },
}))
