import React, { FC, useEffect, useState, useCallback } from 'react'
import { StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { CustomButton } from 'components/CustomButton'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { ChangesSavedModal } from 'components/ChangesSavedModal'
import { useModalContext } from 'contexts/ModalProvider'
import { UserProfileNavigationProps } from 'navigation/types'
import { Box, Text, theme, mkUseStyles, Theme } from 'utils/theme'
import { TEAMS, TeamsType } from 'utils/mocks/teamsMocks'
import IconBack from 'assets/icons/icon-back.svg'
import IconSearch from 'assets/icons/icon-search.svg'
import { useUserDetailsContext } from '../helpers/UserDetailsContext'

type SubscribeNewTeamProps = UserProfileNavigationProps<'SubscribeTeam'>
type ParsedTeamsType = TeamsType & { isSelected?: boolean }

export const SubscribeNewTeam: FC<SubscribeNewTeamProps> = () => {
  const { t } = useTranslation('userProfile')
  const styles = useStyles()
  const { handleModal } = useModalContext()
  const { goBack } = useNavigation()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [masterData, setMasterData] = useState<ParsedTeamsType[]>([])
  const [filteredTeams, setFilteredTeams] = useState<ParsedTeamsType[]>([])
  const [subscribedTeams, setSubscribedTeams] = useState<ParsedTeamsType[]>([])
  const { userTeams, setUserTeams } = useUserDetailsContext()

  const parseTeams = (teams: TeamsType[]) =>
    teams?.map((team) => ({ id: team.id, teamName: team.teamName, isSelected: false }))

  const filterAlreadySubmittedSubscriptions = useCallback(() => {
    const teamsAvailableToSubscribe = parseTeams(TEAMS).filter(
      ({ teamName }) => !userTeams.some((userTeam) => userTeam.teamName === teamName)
    )
    setMasterData(teamsAvailableToSubscribe)
    setFilteredTeams(teamsAvailableToSubscribe)
  }, [userTeams])

  const checkTeamsAvailableToSubscribe = (subscriptions: ParsedTeamsType[]): ParsedTeamsType[] =>
    masterData.filter(
      (masterTeam) => !subscriptions.some(({ teamName }) => teamName === masterTeam.teamName)
    )

  const searchFilter = (text: string) => {
    setSearchPhrase(text)
    if (text) {
      const filteredItems = filteredTeams.filter(({ teamName }) =>
        teamName.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredTeams(filteredItems)
    } else {
      setFilteredTeams(checkTeamsAvailableToSubscribe(subscribedTeams))
    }
  }
  const toggleSelection = (id: number | string) => {
    filteredTeams.forEach((team) => {
      if (team.id === id) {
        team.isSelected = !team.isSelected
      }
    })
  }

  const addToSubscriptions = ({ teamName, id, isSelected }: ParsedTeamsType) => {
    const subscriptions = [...subscribedTeams, { teamName, id, isSelected: !isSelected }]
    toggleSelection(id)
    setSubscribedTeams(subscriptions)
  }

  const removeFromSubscriptions = (id: string | number) => {
    const subscriptions = subscribedTeams.filter((item) => item.id !== id)
    toggleSelection(id)
    setSubscribedTeams(subscriptions)
  }

  const confirmationMessage = () => {
    const teamNames = subscribedTeams.map(({ teamName }) => teamName).join(' and ')
    return `${teamNames} subscribed!`
  }

  const submitSubscriptions = () => {
    setUserTeams([...subscribedTeams, ...userTeams])
    handleModal(
      <ChangesSavedModal
        isVisible
        content={confirmationMessage()}
        hideModal={() => handleModal()}
      />
    )
    goBack()
  }

  useEffect(() => {
    if (TEAMS) filterAlreadySubmittedSubscriptions()
  }, [filterAlreadySubmittedSubscriptions])

  useEffect(() => {
    StatusBar.setBackgroundColor(theme.colors.modalBackdrop)
    return () => StatusBar.setBackgroundColor('white')
  }, [])

  const handleGoBack = () => {
    if (subscribedTeams.length > 0) {
      handleModal(
        <ConfirmationModal
          isVisible
          hideModal={() => handleModal()}
          onAccept={() => {
            setSubscribedTeams([])
            setFilteredTeams(masterData)
            handleModal()
            goBack()
          }}
          onDecline={() => {
            handleModal()
          }}
          content={t('quitMessage')}
        />
      )
    } else {
      goBack()
    }
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} backgroundColor="modalBackdrop">
        <Box
          flex={1}
          backgroundColor="disabledText"
          marginTop="xm"
          borderTopRightRadius="lmin"
          borderTopLeftRadius="lmin"
          padding="l"
          style={styles.shadow}>
          <TouchableOpacity activeOpacity={0.2} onPress={handleGoBack} style={styles.backBtn}>
            <IconBack />
          </TouchableOpacity>
          <Text variant="boldBlackCenter20">{'Subscribe more teams'}</Text>
          <Box position="relative" marginTop="lplus" marginBottom="xxl">
            <TextInput
              style={styles.searchInput}
              onChangeText={searchFilter}
              value={searchPhrase}
            />
            <IconSearch style={styles.searchIcon} />
          </Box>
          <Text variant="lightGreyRegular">{`Selected: ${subscribedTeams.length}`}</Text>
          <ScrollView>
            <Box flexDirection="row" flexWrap="wrap">
              {filteredTeams.map(({ teamName, id, isSelected }) => (
                <RectButton
                  key={id}
                  style={isSelected ? styles.subscribedTeam : styles.teamItem}
                  onPress={() =>
                    isSelected
                      ? removeFromSubscriptions(id)
                      : addToSubscriptions({ teamName, id, isSelected })
                  }>
                  <Text color={isSelected ? 'white' : 'black'} variant="bold15">
                    {teamName}
                  </Text>
                </RectButton>
              ))}
            </Box>
          </ScrollView>
          {subscribedTeams.length > 0 && (
            <Box position="absolute" bottom={16} alignSelf="center">
              <CustomButton
                label={'Subscribe'}
                variant="primary"
                onPress={submitSubscriptions}
                width={221}
                height={53}
              />
            </Box>
          )}
        </Box>
      </Box>
    </SafeAreaWrapper>
  )
}
const useStyles = mkUseStyles((theme: Theme) => ({
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.black,
    shadowRadius: 10,
    elevation: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    top: 17,
    zIndex: theme.zIndices['5'],
  },
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
  teamItem: {
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.xm,
    borderRadius: theme.borderRadii.xxl,
  },
  subscribedTeam: {
    backgroundColor: theme.colors.black,
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.xm,
    paddingHorizontal: theme.spacing.ml,
    paddingVertical: theme.spacing.xm,
    borderRadius: theme.borderRadii.xxl,
  },
}))
